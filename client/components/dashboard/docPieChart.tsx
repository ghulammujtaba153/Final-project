"use client";

import React, { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import Spinner from "@/components/Spinner"; // Replace with your Spinner component
import API_BASE_URL from "@/utils/apiConfig"; // Adjust path as needed
import { UserContext } from "@/context/UserContext";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const GenderPieChart = () => {
  const [loading, setLoading] = useState(true);
  const [genderData, setGenderData] = useState({ male: 0, female: 0 });
  const {user}=useContext(UserContext);

  useEffect(() => {
    const fetchGenderData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/appointments/doctor/gender/${user._id}`
        );
        console.log("Gender Data", response.data);
        setGenderData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching gender data:", error);
        setLoading(false);
      }
    };

    fetchGenderData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
      </div>
    );
  }

  const chartData = {
    labels: ["Male Patients", "Female Patients"],
    datasets: [
      {
        data: [genderData.male, genderData.female],
        backgroundColor: ["#36A2EB", "#FF6384"], // Blue for male, pink for female
        hoverBackgroundColor: ["#1E90FF", "#FF4F81"],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-lg text-black p-2">
      <h1 className="text-2xl font-bold mb-4">Patient Gender Distribution</h1>
      <div className="w-[250px] h-[100%]">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default GenderPieChart;
