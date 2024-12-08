import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';

// Initial state structure for a doctor
const initialDoctor = {
  _id: "",
  firstName: "",
  lastName: "",
  gender: '',
  email: "",
  password: "",
  role: "doctor",
  dateOfBirth: "",
  contactNumber: "",
  postalAddress: "",
  permanentAddress: "",
  doctorId: "",
  specialization: "",
  experience: '',
  fee: 0,
  doctor_qualification: [
    { qualificationName: "", startYear: "", endYear: "" },
    { qualificationName: "", startYear: "", endYear: "" }
  ],
  availability: {},
};

// Thunk for fetching doctors
export const fetchDoctors = createAsyncThunk(
  'doctors/fetchDoctors',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/doctors`);
      console.log(res.data)
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch doctors');
    }
  }
);

// Thunk for editing a doctor
export const editDoctor = createAsyncThunk(
  'doctors/editDoctor',
  async ({ doctorId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/doctors/profiles/${doctorId}`, updatedData);
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update doctor profile');
    }
  }
);

export const deleteDoctor = createAsyncThunk(
    'doctors/deleteDoctor',
    async ({ userId, doctorId }, { rejectWithValue }) => {
      try {
        await axios.delete(`${API_BASE_URL}/doctors/delete/${userId}/${doctorId}`);
        return doctorId; // Return the doctorId to identify which doctor was deleted
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState: {
    doctors: [], // List of doctors
    loading: false, // Loading status for fetching/editing
    error: null, // Error state
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle pending state for fetchDoctors
    builder.addCase(fetchDoctors.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // Handle fulfilled state for fetchDoctors
    builder.addCase(fetchDoctors.fulfilled, (state, action) => {
      state.loading = false;
      state.doctors = action.payload; // Set fetched doctors
    });
    // Handle rejected state for fetchDoctors
    builder.addCase(fetchDoctors.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Something went wrong while fetching doctors';
    });

    // Handle pending state for editDoctor
    builder.addCase(editDoctor.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // Handle fulfilled state for editDoctor
    builder.addCase(editDoctor.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload)
      // Update the doctor in the state
      state.doctors = state.doctors.map((doctor) =>
      console.log(doctor)
        // doctor._id === action.payload._id ? action.payload : doctor
      );
    });
    // Handle rejected state for editDoctor
    builder.addCase(editDoctor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to update doctor profile';
    });

    builder.addCase(deleteDoctor.pending, (state) => {
        state.loading = true; // Optionally, handle loading state if necessary
        state.error = null;
      });
      
      // Handle fulfilled state for delete
      builder.addCase(deleteDoctor.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted doctor from the state
        state.doctors = state.doctors.filter(doctor => doctor._id !== action.payload);
      });
      
      // Handle rejected state for delete
      builder.addCase(deleteDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default doctorsSlice.reducer;
