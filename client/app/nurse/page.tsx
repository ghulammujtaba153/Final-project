"use client"

import React from 'react'
import StatCard from '@/components/dashboard/admin/StatCard';
import { FaUsers, FaUserMd, FaCalendarCheck, FaFlask } from 'react-icons/fa';
import AppointmentSuccessRateChart from '@/components/dashboard/admin/AppointmentRateChart';
import UserGrowthChart from '@/components/dashboard/admin/UserGrowthChart';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';
import TestReportPieChart from '@/components/dashboard/nurse/testReportsPiechart';
import UpcomingAppointments from '@/components/dashboard/nurse/upCommingAppointments';
import GenderWisePieChart from '@/components/dashboard/nurse/genderWisePieChart';



const MainPage = () => {
  const [stats, setStats] = React.useState({
    upcommingAppointments : 0,
    totalAppointments: 0,
    earnings: 0,
  });
  const [appointmentData, setAppointmentData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const appointments=await axios.get(`${API_BASE_URL}/nurseStats/test-appointments`);
      console.log(appointments.data);
      setAppointmentData(appointments.data);
      const res= await axios.get(`${API_BASE_URL}/nurseStats`);
      console.log(res.data);
      setStats(res.data);
    };
    fetchData();
  }, []);

  // const appointmentData = [
  //   { month: 'Jan', Completed: 70, Canceled: 20, Missed: 10 },
  //   { month: 'Feb', Completed: 60, Canceled: 25, Missed: 15 },
  //   { month: 'Mar', Completed: 10, Canceled: 1, Missed: 1 },
  //   { month: 'April', Completed: 20, Canceled: 2, Missed: 25 },
  //   { month: 'May', Completed: 50, Canceled: 10, Missed: 30 },
  //   { month: 'June', Completed: 40, Canceled: 15, Missed: 45 },
  //   { month: 'July', Completed: 90, Canceled: 30, Missed: 20 },
  // ];

  const userGrowthData = [
    { month: 'Jan', Doctors: 20, Patients: 50, LabOperators: 5 },
    { month: 'Feb', Doctors: 40, Patients: 80, LabOperators: 10 },
    { month: 'Mar', Doctors: 10, Patients: 40, LabOperators: 3 },
    { month: 'April', Doctors: 2, Patients: 30, LabOperators: 10 },
    { month: 'May', Doctors: 15, Patients: 50, LabOperators: 8 },
    { month: 'June', Doctors: 25, Patients: 60, LabOperators: 15 },
    { month: 'July', Doctors: 35, Patients: 10, LabOperators: 18 },
  ];
  

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-3xl font-bold mb-6 text-white">Dashboard Overview</h1>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FaUsers />}
          iconBg="#e0eafc"
          title= {stats.totalAppointments}
          subtitle="Total Appointments"
        />
        <StatCard
          icon={<FaUserMd />}
          iconBg="#e0f4f1"
          title={stats.upcommingAppointments}
          subtitle="New Appointments"
        />
        <StatCard
          icon={<FaCalendarCheck />}
          iconBg="#fcf4dd"
          title={stats.earnings}
          subtitle="Total Earnings"
        />
        <StatCard
          icon={<FaFlask />}
          iconBg="#fff4e5"
          title="3"
          subtitle="Total Laboratory Operators"
        />
      </div>

    
      <div className="max-w-5xl flex items-center flex-col gap-6 w-full mb-8">
        {/* Left Side */}
        <div className="flex flex-wrap gap-6">
          <div className="flex-grow bg-white shadow-md rounded-lg p-4 h-1/2">
            <TestReportPieChart />
          </div>

          <div className="flex-grow bg-white shadow-md rounded-lg p-4 h-1/2">
            <GenderWisePieChart/>
          </div>

          
          <div className="flex-grow bg-white shadow-md rounded-lg p-4 h-1/2">
            <UpcomingAppointments />
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-white shadow-md rounded-lg p-4 w-full flex items-stretch">
          
          <AppointmentSuccessRateChart data={appointmentData} />
        </div>
      </div>
      
    </div>
  )
}

export default MainPage