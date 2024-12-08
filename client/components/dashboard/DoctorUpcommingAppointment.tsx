
"use client";

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';
import { UserContext } from '@/context/UserContext'; // Adjust path as needed

const DoctorUpcomingAppointment = () => {
  const [appointment, setAppointment] = useState(null);
  const [patient, setPatient] = useState(null); // State to store doctor details
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUpcomingAppointment = async () => {
      if (!user) return; // Early return if user is not defined

      try {
        console.log(user)
        const userRes = await axios.get(`${API_BASE_URL}/doctors/${user._id}`);
        console.log(userRes.data)
//         // Fetch upcoming appointment
       const res = await axios.get(`${API_BASE_URL}/appointments/doctor/${user._id}`);
       console.log(res.data)

        // Get the current date and time
        const currentDateTime = new Date();
        console.log('Current DateTime:', currentDateTime);

        // Function to parse custom date format
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

        // Log sorted upcoming appointments
        console.log('Sorted Upcoming Appointments:', upcomingAppointments);

        if (upcomingAppointments.length > 0) {
          setAppointment(upcomingAppointments[0]);
          setPatient(upcomingAppointments[0].patientId);

        
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
        <p>No upcoming appointments</p>
      </div>
    );
  }

  const { doctorId, timing } = appointment;

  return (
    <div className='flex flex-col justify-center bg-white text-grey5 rounded-md w-full items-center p-4'>
      <p className='font-bold text-lg'>Upcoming Appointment</p>
      <div className='flex justify-center items-center gap-[40px]'>
        <div className='flex items-center gap-2'>
          {patient && (
            <>
              <img src={patient.profile} alt="Doctor" className='w-[50px] h-[50px] rounded-full'/>
              <p className='font-bold'>{patient.firstName} {patient.lastName}</p>
            </>
          )}
        </div>
        <p>Appointment At: <span>{timing}</span></p>
      </div>
    </div>
  );
};

export default DoctorUpcomingAppointment;
