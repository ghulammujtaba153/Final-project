// store.ts
import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from './slices/appointmentSlice';
import doctorsReducer from './slices/doctorsSlice'

export const store = configureStore({
  reducer: {
    appointments: appointmentReducer,
    doctors: doctorsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
