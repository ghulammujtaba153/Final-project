"use client";

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';
import { UserContext } from '@/context/UserContext'; // Adjust path as needed

const UpcomingAppointment = () => {
  const [appointment, setAppointment] = useState(null);
  const [doctor, setDoctor] = useState(null); // State to store doctor details
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUpcomingAppointment = async () => {
      if (!user) return; // Early return if user is not defined

      try {
        // Fetch all appointments
        const res = await axios.get(`${API_BASE_URL}/appointments/upcoming/${user._id}`);
        console.log('API Response:', res.data); // Log the entire response to verify format

        // Get the current date and time
        const currentDateTime = new Date();
        console.log('Current DateTime:', currentDateTime);

        const test=await axios.get(`${API_BASE_URL}/testAppointments/upcoming/${user._id}`);
        console.log(test.data.upcomingTestAppointments);

        // Function to parse custom date
        const parseCustomDateFormat = (dateString) => {
          const [datePart, timePart] = dateString.split('T');
          const [year, month, day] = datePart.split('-');
          let [hour, minute] = timePart.split(' ')[0].split(':');
          const period = timePart.split(' ')[1];
          
          // Convert hour to 24-hour format
          if (period === 'PM' && hour !== '12') {
            hour = parseInt(hour, 10) + 12;
          } else if (period === 'AM' && hour === '12') {
            hour = 0;
          }

          return new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
        };

        // Filter appointments to show only upcoming ones
        const upcomingAppointments = res.data.filter((appointment) => {
          // Check if timing field exists and is a valid date
          if (!appointment.timing) {
            console.warn('Appointment timing is missing or empty:', appointment);
            return false;
          }

          const appointmentTime = parseCustomDateFormat(appointment.timing);
          console.log('Appointment Time:', appointmentTime);

          // Check if appointmentTime is valid
          if (isNaN(appointmentTime.getTime())) {
            console.warn('Invalid appointment time:', appointment.timing);
            return false;
          }

          return appointmentTime > currentDateTime;
        });

        // Log filtered upcoming appointments
        console.log('Filtered Upcoming Appointments:', upcomingAppointments);

        // Sort upcoming appointments by time (nearest first)
        upcomingAppointments.sort((a, b) => parseCustomDateFormat(a.timing) - parseCustomDateFormat(b.timing));
        upcomingAppointments.filter((appointment) =>  appointment.status.toLowerCase() != 'canceled');

        // Log sorted upcoming appointments
        console.log('Sorted Upcoming Appointments:', upcomingAppointments);

        if (upcomingAppointments.length > 0) {
          setAppointment(upcomingAppointments[0]);

          // Fetch doctor details
          const doctorRes = await axios.get(`${API_BASE_URL}/user/${upcomingAppointments[0].doctorId._id}`);
          setDoctor(doctorRes.data.user);
        }
      } catch (error) {
        console.error('Error fetching upcoming appointment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingAppointment();
  }, [user]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500'></div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className='flex flex-col justify-center bg-white text-grey5 rounded-md w-full items-center p-4'>
        <p className='font-bold text-lg'>No upcoming appointments</p>
      </div>
    );
  }

  const { doctorId, timing } = appointment;

  return (
    <div className='flex flex-col justify-center bg-white text-grey5 rounded-md w-full items-center p-4'>
      <p className='font-bold text-lg'>Upcoming Appointment</p>
      <div className='flex justify-center items-center gap-[40px]'>
        <div className='flex items-center gap-2'>
          {doctor && (
            <>
              <img src={doctor.profile} alt="Doctor" className='w-[50px] h-[50px] rounded-full'/>
              <p className='font-bold'>{doctor.firstName} {doctor.lastName}</p>
            </>
          )}
        </div>
        <p>Appointment At: <span>{timing}</span></p>
      </div>
    </div>
  );
};

export default UpcomingAppointment;
