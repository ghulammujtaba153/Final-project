'use client';

import StatCard from '@/components/dashboard/admin/StatCard';
import UserGrowthChart from '@/components/dashboard/admin/UserGrowthChart';
import AppointmentSuccessRateChart from '@/components/dashboard/admin/AppointmentRateChart';
import React, { useEffect, useState } from 'react';
import { FaUsers, FaUserMd, FaCalendarCheck, FaFlask } from 'react-icons/fa';
import DoctorsSpecializationPieChart from '@/components/dashboard/admin/DoctorsSpecializationPieChart';
import GenderDistributionPieChart from '@/components/dashboard/admin/GenderDistributionPieChart';
import FeedbackPieChart from '@/components/dashboard/admin/FeedbackPieChart';
import TopDoctors from '@/components/dashboard/admin/TopDoctors';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';

const Page = () => {

  const [stats, setStats]=useState({});
  const [specializationData, setSpecializationData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  // const [userGrowthData, setUserGrowthData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/admin/stats`);
        console.log(res.data);
        setStats(res.data);

        // const resp= await axios.get(`${API_BASE_URL}/admin/user-growth`);
        // console.log(resp.data);
        // setUserGrowthData(resp.data);


        const specilaizationRes = await axios.get(`${API_BASE_URL}/admin/specialization-data`);
        console.log(specilaizationRes.data);
        setSpecializationData(specilaizationRes.data);

        const genderRes = await axios.get(`${API_BASE_URL}/admin/gender-distribution`);
        console.log(genderRes.data);
        setGenderData(genderRes.data);

      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  const userGrowthData = [
    { month: 'Jan', Doctors: 20, Patients: 50, LabOperators: 5 },
    { month: 'Feb', Doctors: 40, Patients: 80, LabOperators: 10 },
    { month: 'Mar', Doctors: 10, Patients: 40, LabOperators: 3 },
    { month: 'April', Doctors: 2, Patients: 30, LabOperators: 10 },
    { month: 'May', Doctors: 15, Patients: 50, LabOperators: 8 },
    { month: 'June', Doctors: 25, Patients: 60, LabOperators: 15 },
    { month: 'July', Doctors: 35, Patients: 10, LabOperators: 18 },
  ];

  const appointmentData = [
    { month: 'Jan', Completed: 70, Canceled: 20, Missed: 10 },
    { month: 'Feb', Completed: 60, Canceled: 25, Missed: 15 },
    { month: 'Mar', Completed: 10, Canceled: 1, Missed: 1 },
    { month: 'April', Completed: 20, Canceled: 2, Missed: 25 },
    { month: 'May', Completed: 50, Canceled: 10, Missed: 30 },
    { month: 'June', Completed: 40, Canceled: 15, Missed: 45 },
    { month: 'July', Completed: 90, Canceled: 30, Missed: 20 },
  ];

  // const specializationData = [
  //   { specialization: 'Cardiology', value: 400 },
  //   { specialization: 'Neurology', value: 300 },
  //   { specialization: 'Pediatrics', value: 200 }
  // ];

  const feedbackData = [
    { type: 'Positive', count: 5 },
    { type: 'Negative', count: 1 }
  ];

  // const genderData = [
  //   { gender: 'Male', users: 600 },
  //   { gender: 'Female', users: 400 }
  // ];

  const doctors = [
    { id: 1, name: "Dr. Thomas White", specialty: "Cardiology", reviews: 216, rating: 5 },
    { id: 2, name: "Dr. Emilia Williamson", specialty: "Surgery", reviews: 200, rating: 4 },
    { id: 3, name: "Dr. Justine Hextall", specialty: "Neurology", reviews: 180, rating: 5 },
    { id: 4, name: "Dr. Dianne Russell", specialty: "Pharmacy", reviews: 50, rating: 4 },
    { id: 5, name: "Dr. Kristin Watson", specialty: "Psychiatry", reviews: 25, rating: 4 }
  ];

  return (
    <div className="flex flex-col items-center bg-primary justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Dashboard Overview</h1>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FaUsers />}
          iconBg="#e0eafc"
          title= {stats.totalPatients}
          subtitle="Total Patients"
        />
        <StatCard
          icon={<FaUserMd />}
          iconBg="#e0f4f1"
          title={stats.totalDoctors}
          subtitle="Total Doctors"
        />
        <StatCard
          icon={<FaCalendarCheck />}
          iconBg="#fcf4dd"
          title={stats.totalAppointments}
          subtitle="Total Appointments"
        />
        <StatCard
          icon={<FaFlask />}
          iconBg="#fff4e5"
          title={stats.totalNurses}
          subtitle="Total Laboratory Operators"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mb-8">
        <div className="bg-white shadow-md rounded-lg p-4 h-96">
          <UserGrowthChart data={userGrowthData} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 h-96">
          <AppointmentSuccessRateChart data={appointmentData} />
        </div>
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mb-8">
        <div className="bg-white shadow-md rounded-lg p-4 h-80">
          <DoctorsSpecializationPieChart data={specializationData} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 h-80">
          <GenderDistributionPieChart data={genderData} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 h-80">
          <FeedbackPieChart data={feedbackData} />
        </div>
      </div>

      {/* Top Doctors */}
      <div className="w-full ">
        <TopDoctors doctors={doctors} />
      </div>
    </div>
  );
};

export default Page;
