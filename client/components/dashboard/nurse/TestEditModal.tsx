import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { TestData } from '@/utils/types';
import { toast } from 'react-hot-toast';
import upload from '@/utils/upload';
import API_BASE_URL from '@/utils/apiConfig';
import axios from 'axios';
import { XIcon } from 'lucide-react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface TestEditModalProps {
  test: TestData;
  open: boolean;
  onClose: () => void;
  onEdit: (id: string, updatedData: Partial<TestData>) => void;
}

export default function TestEditModal({ test, open, onClose, onEdit }: TestEditModalProps) {
  const [_id, setTestId] = React.useState(test._id);
  const [testName, setTestName] = React.useState(test.testName);
  const [picture, setPicture] = React.useState<File | null>(null);
  const [price, setPrice] = React.useState(test.price);
  const [description, setDescription] = React.useState(test.description);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPicture(e.target.files[0]);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async () => {
    const updatedData: Partial<TestData> = {
      _id,
      testName,
      price,
      description,
    };

    try {
      if (picture) {
        // Upload picture and update the picture URL in updatedData
        const imageUrl = await toast.promise(upload(picture), {
          loading: 'Uploading image...',
          success: 'Image uploaded successfully!',
          error: 'Failed to upload image',
        });
        updatedData.picture = imageUrl;
      }

      // Update test data
      await toast.promise(
        axios.put(`${API_BASE_URL}/tests/update`, updatedData),
        {
          loading: 'Updating test...',
          success: 'Test updated successfully!',
          error: 'Failed to update test',
        }
      );

      // Call onEdit and close modal
      onEdit(test._id, updatedData);
      onClose();
    } catch (error) {
      // Toast messages are handled inside toast.promise
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-test-modal-title"
      aria-describedby="edit-test-modal-description"
    >
      <Box sx={style}>
        <Typography id="edit-test-modal-title" variant="h6" component="h2">
          Edit Test
        </Typography>
        <XIcon className='text-back hover:text-gray-200 absolute right-4 top-4 cursor-pointer' onClick={onClose} />
        <TextField
          label="Test Name"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          component="label"
          fullWidth
          margin="normal"
          className="bg-green-100 rounded-lg hover:bg-green-300 mt-4"
        >
          <img
            src={test.picture}
            alt="Test Picture"
            className="w-full h-[80px] object-cover cursor-pointer"
            onClick={handleImageClick}
          />
          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handlePictureChange}
            accept="image/*"
          />
        </Button>
        {picture && <Typography variant="body2">{picture.name}</Typography>}
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button onClick={handleSubmit} className="bg-green-100 rounded-lg hover:bg-green-300 mt-4">
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
}
