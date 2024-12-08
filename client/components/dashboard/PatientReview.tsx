import React, { useContext, useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Rating } from '@mui/material';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';
import { UserContext } from '@/context/UserContext';

const PatientReviewModal = ({ open, onClose, appointmentId, users }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [doctorId, setDoctorId]=useState('');
  const [patientId, setPatientId]=useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (users[0]._id !== user._id) {
      setDoctorId(users[0]._id);
      setPatientId(users[1]._id);
    } else {
      setDoctorId(users[1]._id);
      setPatientId(users[0]._id);
    }
  },[users, user]);

  const handleSubmit = async () => {
    const ratingData = {
        doctorId,
        patientId,
        appointmentId,
        rating,
        comment,
    };
    console.log(ratingData);

    try {
      await axios.post(`${API_BASE_URL}/ratings/create`, ratingData);
      alert('Thank you for your feedback!');
      onClose();  // Close the modal after submission
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating. Please try again.');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Rate Your Appointment
        </Typography>
        <Rating
          name="appointment-rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          precision={0.5}
          size="large"
        />
        <TextField
          fullWidth
          label="Add a comment"
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default PatientReviewModal;
