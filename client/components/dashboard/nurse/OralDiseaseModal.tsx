import React, { useState, ChangeEvent, FormEvent } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import API_BASE_URL from "@/utils/apiConfig";  // Assuming you're using this configuration for API requests

// Define types for the result and error
interface OralDiseaseResult {
  predicted_oral_disease: string;
}

const style = {
  position: 'absolute',
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

export default function OralDiseaseModal({ id }: { id: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<OralDiseaseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setResult(null); // Reset result on new file selection
      setError(null);
    }
  };

  // Handle form submit to predict oral disease
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setError("Please upload an image before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/oral-disease-predict`,
        formData, 
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response.data)
      setResult(response.data);
    } catch (error) {
      setError("An error occurred while predicting the disease.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle form submission to backend
  const handleSubmitToBackend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!result) return; // Ensure we only submit after prediction

    setLoading(true);

    const form = {
      testId: id,
      result: result.predicted_oral_disease,
    };

    try {
      const res = await axios.post(`${API_BASE_URL}/testReports/oralDisease/create`, form);
      console.log(res.data);
      const resStatus = await axios.put(`${API_BASE_URL}/testappointments/${id}`, { status: "completed" });
      console.log(resStatus.data);
    } catch (error) {
      setError("An error occurred while submitting the result.");
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
          '&:hover': {
            backgroundColor: '#0056b3',
            color: 'white',
          },
        }}
      >
        Upload Oral Disease Image
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
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2} textAlign="center">
            Oral Disease Prediction
          </Typography>

          <form onSubmit={result ? handleSubmitToBackend : handleSubmit}>
            <label>
              Upload Image:
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full rounded-md px-3 py-2 border-2 cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>

            {!result && (
              <Button 
                type="submit"
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
                {loading ? <CircularProgress size={24} /> : "Predict"}
              </Button>
            )}

            {result && (
              <Button 
                onClick={handleSubmitToBackend}
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
                {loading ? <CircularProgress size={24} /> : "Submit"}
              </Button>
            )}

            {loading && <p>Loading...</p>}

            {result && (
              <Typography variant="h6" component="p" mt={2}>
                Predicted Oral Disease: {result.prediction}
              </Typography>
            )}

            {error && <p className="text-red-500">{error}</p>}
          </form>
        </Box>
      </Modal>
    </div>
  );
}
