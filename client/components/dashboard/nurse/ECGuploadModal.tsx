"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { useState } from 'react';
import upload from '@/utils/upload';
import API_BASE_URL from '@/utils/apiConfig';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

interface ECGuploadModalProps {
  id: string;
}

export default function ECGuploadModal({ id }: ECGuploadModalProps) {
  console.log(id)
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
    setPrediction(null);
    setError("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setError(""); // Reset error if the user selects a file
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError("Please upload a file.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "http://127.0.0.1:8002/process_ecg",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPrediction(response.data.result);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while uploading. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendToPatient = async () => {
    if (!selectedFile || !prediction) {
      setError("Please upload a file and generate a prediction.");
      return;
    }
    setLoading(true);
    setError("");
  
    try {
      const res = await upload(selectedFile);

      const formData={
        testId: id,
        ecg: res,
        prediction: prediction,
      }

  
      const resp=await axios.post(`${API_BASE_URL}/testReports/ecg/create`, formData);
      console.log(resp.data);

      const resStatus=await axios.put(`${API_BASE_URL}/testappointments/${id}`, {status: "completed"});
      console.log(resStatus);

      setOpen(false);
      
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while sending the report. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return (
    <div>
      <Button 
        onClick={handleOpen} 
        className="bg-ablue m-4 text-white hover:text-black"
        sx={{
          textTransform: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          backgroundColor: '#1976d2',
          color: 'white',
          
          '&:hover': {
            backgroundColor: '#0056b3',
            color: 'white',
          },
        }}
      >
        Upload ECG
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2} textAlign="center">
            Upload ECG File
          </Typography>

          <input
            type="file"
            id="ecg-upload"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="ecg-upload">
            <Button
              component="span"
              sx={{
                display: 'block',
                width: '100%',
                borderRadius: '8px',
                padding: '8px 16px',
                backgroundColor: '#1976d2',
                color: 'white',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#0056b3',
                },
              }}
            >
              Choose File
            </Button>
          </label>

          {
            !prediction && (
              <Button
            onClick={handleSubmit}
            sx={{
              marginTop: 2,
              display: 'block',
              width: '100%',
              borderRadius: '8px',
              padding: '8px 16px',
              backgroundColor: '#1976d2',
              color: 'white',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#0056b3',
              },
            }}
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
            )
          }

          {prediction && (
            <Button
              onClick={handleSendToPatient}
              sx={{
                marginTop: 2,
                display: 'block',
                width: '100%',
                borderRadius: '8px',
                padding: '8px 16px',
                backgroundColor: '#1976d2',
                color: 'white',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#0056b3',
                },
              }}
            >
              {loading ? "Sending..." : "Send to Patient"}
            </Button>
          )}

          {error && (
            <Typography color="error" mt={2} textAlign="center">
              {error}
            </Typography>
          )}

          {prediction && (
            <Typography color="green" mt={2} textAlign="center">
              Prediction: {prediction}
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
}
