import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';
import { UserContext } from '@/context/UserContext';
import CircularProgress from '@mui/material/CircularProgress';
import toast from 'react-hot-toast';
import { XIcon } from 'lucide-react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

interface TestAppointmentModalProps {
  appointmentId: string;
  fee: number;
}

export default function TestAppointmentModal({ appointmentId, fee }: TestAppointmentModalProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { user } = React.useContext(UserContext);
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const data = {
    patientId: user._id,
    testId: appointmentId,
    appointmentDate: date,
    appointmentTime: time,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/testappointments/create`, data);
      console.log(res.data);

      const payRes = await axios.post(`${API_BASE_URL}/payments/test/create`, {
        testId: appointmentId,
        patientId: user._id,
        amount: fee,
      });
      console.log(payRes.data);
      handleClose();
      toast.success('Appointment created successfully!');
    } catch (error) {
      console.error('Error submitting appointment:', error);
      toast.error('Failed to create appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} className="bg-green-100 rounded-lg hover:bg-green-300">Appointment</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <XIcon
            className="w-6 h-6 text-black hover:text-gray-300 cursor-pointer absolute top-3 right-3"
            onClick={handleClose}
          />
          <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
            Enter Date and Time for Test Appointment
          </Typography>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            onClick={handleSubmit}
            className="bg-green rounded-lg hover:bg-green-300 mt-4"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
