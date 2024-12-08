'use client';

import React, { useContext, useEffect, useState } from 'react';
import UpcomingAppointment from '@/components/dashboard/UpcomingAppointment';
import "../globals.css"
import StatCard from '@/components/dashboard/admin/StatCard';
import { FaUsers, FaUserMd, FaCalendarCheck, FaFlask } from 'react-icons/fa';
import Medicine from '@/components/dashboard/Medicine';
import { UserContext } from '@/context/UserContext';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [testAppointments, setTestAppointments] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/patientStats/appointments/${user?._id}`);
        const data = res.data;
        setAppointments(data);

        const test = await axios.get(`${API_BASE_URL}/patientStats/testAppointments/${user?._id}`);
        setTestAppointments(test.data);
      } catch (error) {
        console.error("Error fetching appointments", error);
      }
    };

    fetchAppointments();
  }, [user]);

  // Function to count total and upcoming appointments
  const countAppointments = (data : any) => {
    const total = data.length;
    const upcoming = data.filter(appointment => 
      new Date(appointment.timing || appointment.appointmentDate) > new Date()
    ).length;
    return { total, upcoming };
  };

  // Count for regular appointments
  const { total: totalAppointments, upcoming: upcomingAppointments } = countAppointments(appointments);

  // Count for test appointments
  const { total: totalTestAppointments, upcoming: upcomingTestAppointments } = countAppointments(testAppointments);

  return (
    <div className='flex flex-col items-center gap-5 m-5 min-h-screen'>
      <p className="text-white">Welcome back! {user?.firstName} {user?.lastName}</p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FaCalendarCheck />}
          iconBg="#fcf4dd"
          title={totalAppointments.toString()}
          subtitle="Total Appointments"
        />
        <StatCard
          icon={<FaCalendarCheck />}
          iconBg="#fcf4dd"
          title={upcomingAppointments.toString()}
          subtitle="Upcoming Appointments"
        />
        <StatCard
          icon={<FaFlask />}
          iconBg="#fff4e5"
          title={totalTestAppointments.toString()}
          subtitle="Total Test Appointments"
        />
        <StatCard
          icon={<FaFlask />}
          iconBg="#fff4e5"
          title={upcomingTestAppointments.toString()}
          subtitle="Upcoming Test Appointments"
        />
      </div>

      <UpcomingAppointment />
      <Medicine />
    </div>
  );
};

export default Dashboard;
