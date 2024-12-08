"use client";

import React, { useContext, useEffect, useState } from 'react';
import EarningGraph from '@/components/dashboard/admin/EarningGraph';
import DoctorUpcomingAppointment from '@/components/dashboard/DoctorUpcommingAppointment';
import { FaUsers, FaUserMd, FaCalendarCheck, FaFlask } from "react-icons/fa";
import StatCard from '@/components/dashboard/admin/StatCard'; // Assuming you have a StatCard component
import { UserContext } from '@/context/UserContext';
import API_BASE_URL from '@/utils/apiConfig';
import axios from 'axios';
import GenderPieChart from '@/components/dashboard/docPieChart';

interface CardData {
  title: string;
  num: number | string;
  icon: JSX.Element;
  iconBg: string;
}

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [earning, setEarning] = useState<number>(0);
  const [averageRating, setAverageRating] = useState(0);
  const [earningsData, setEarningsData] = useState({ prices: [], dates: [] });
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) return;

    const fetchAppointmentsAndEarnings = async () => {
      try {
        // Fetch appointments
        const appointmentRes = await axios.get(`${API_BASE_URL}/appointments/all/doctor/${user?._id}`);
        setAppointments(appointmentRes.data);

        // Fetch earnings and calculate the total and average earnings per date
        const earningRes = await axios.get(`${API_BASE_URL}/doctorStats/totalEarning/${user?._id}`);
        const earningsData = earningRes.data;
        console.log("Eaning", earningRes.data)

        // Sum the earnings by adding the 'amount' field
        const totalEarnings = earningsData.reduce((acc: number, curr: { amount: number }) => acc + curr.amount, 0);
        setEarning(totalEarnings);

        // Group earnings by date and calculate average for each date
        const earningsByDate: { [date: string]: number[] } = {};
        earningsData.forEach((earning: { amount: number, createdAt: string }) => {
          const date = new Date(earning.createdAt).toDateString();
          if (!earningsByDate[date]) {
            earningsByDate[date] = [];
          }
          earningsByDate[date].push(earning.amount);
        });

        // Calculate average earnings per date
        const avgEarnings = Object.keys(earningsByDate).map(date => {
          const totalForDate = earningsByDate[date].reduce((acc, curr) => acc + curr, 0);
          const avgForDate = totalForDate / earningsByDate[date].length;
          return { date, avg: totalForDate };
        });

        // Format the data for the EarningGraph
        const graphData = {
          prices: avgEarnings.map(item => item.avg),
          dates: avgEarnings.map(item => item.date),
        };
        console.log(graphData)
        setEarningsData(graphData);

        // Fetch reviews and calculate average rating
        const reviewRes = await axios.get(`${API_BASE_URL}/ratings/doctor/${user?._id}`);
        const ratings = reviewRes.data.map((review: any) => review.rating);
        const totalRating = ratings.reduce((acc: number, rating: number) => acc + rating, 0);
        const avgRating = ratings.length ? totalRating / ratings.length : 0;
        setAverageRating(avgRating);

      } catch (error) {
        console.error("Error fetching appointments", error.message);
      }
    };

    fetchAppointmentsAndEarnings();
  }, [user]);

  const cardData: CardData[] = [
    { title: "Total Appointments", num: appointments.length || '0', icon: <FaCalendarCheck />, iconBg: '#fcf4dd' },
    { title: "Today's Appointments", num: appointments.filter(app => new Date(app.createdAt).toDateString() === new Date().toDateString()).length || '0', icon: <FaUserMd />, iconBg: '#e0f4f1' },
    { title: "Total Earnings", num: `$${earning}` || '0', icon: <FaFlask />, iconBg: '#fff4e5' },
    { title: "Overall Ratings", num: parseFloat(averageRating.toFixed(2)) || '0', icon: <FaUsers />, iconBg: '#e0eafc' },
  ];

  return (
    <div className="flex flex-col items-center gap-4 min-h-screen p-5">
      <p className="text-white flex-left">Welcome! Doctor </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cardData.map((data, index) => (
          <StatCard
            key={index}
            icon={data.icon}
            iconBg={data.iconBg}
            title={data.num.toString()}
            subtitle={data.title}
          />
        ))}
      </div>
      

      <div className="w-full flex flex-col md:flex-row items-stretch justify-center gap-6">
        {/* Gender Pie Chart */}
        <div className="bg-white shadow-md rounded-lg p-6 flex-grow max-w-sm md:max-w-md">
          <GenderPieChart />
        </div>

        {/* Doctor Upcoming Appointments */}
        <div className="bg-white shadow-md rounded-lg p-6 flex-grow max-w-sm md:max-w-md">
          <DoctorUpcomingAppointment />
        </div>
      </div>

      <div className='w-full bg-white'>
        <EarningGraph data={earningsData} />
      </div>
    </div>
  );
};

export default Dashboard;
