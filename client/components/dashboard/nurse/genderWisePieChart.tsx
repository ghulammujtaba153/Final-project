"use client";

import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import API_BASE_URL from "@/utils/apiConfig";
import Spinner from "@/components/Spinner";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const GenderWisePieChart = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/testReports/gender`);  
        const { male, female } = res.data;

        // Prepare data for the chart
        const data = {
          labels: ["Male", "Female"],
          datasets: [
            {
              data: [male, female],
              backgroundColor: ["#3498DB", "#E74C3C"], // Blue for Male, Red for Female
              hoverBackgroundColor: ["#2980B9", "#C0392B"],
            },
          ],
        };

        setChartData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching gender-wise data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-lg font-bold mb-4 text-black">Gender-Wise Patients</h1>
      <div className="w-[250px] h-[100%]">
        <Pie
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default GenderWisePieChart;
