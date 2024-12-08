// appointmentSlice.ts

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';

// Define the state type
interface AppointmentState {
  appointments: Array<any>;
  status: string;
  error: string | null;
}

// Initial state
const initialState: AppointmentState = {
  appointments: [],
  status: 'idle',
  error: null,
};

// Thunk to fetch appointments
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (doctorId: string) => {
    const response = await axios.get(`${API_BASE_URL}/appointments/all/${doctorId}`);
    console.log(response.data);
    return response.data;
  }
);

// Thunk to update the appointment status
export const updateAppointmentStatus = createAsyncThunk(
  'appointments/updateAppointmentStatus',
  async ({ id, status }: { id: string, status: string }) => {
    const response = await axios.put(`${API_BASE_URL}/appointments/${id}/status`, { status });
    return { id, status: response.data.status };
  }
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointments.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch appointments';
      })

      // Update appointment status
      .addCase(updateAppointmentStatus.fulfilled, (state, action: PayloadAction<{ id: string, status: string }>) => {
        const { id, status } = action.payload;
        const appointment = state.appointments.find((app) => app._id === id);
        if (appointment) {
          appointment.status = status;
        }
      });
  }
});

export default appointmentSlice.reducer;
