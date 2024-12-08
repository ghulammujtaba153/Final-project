"use client";

import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import API_BASE_URL from "@/utils/apiConfig";
import Spinner from "@/components/Spinner";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const TestReportPieChart = () => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState({ ecgReports: 0, cbcReports: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/testReports/total`);
        console.log(res.data)
        setReportData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching report data:", error);
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

  const chartData = {
    labels: ["ECG Reports", "CBC Reports"],
    datasets: [
      {
        data: [reportData.ecgReports, reportData.cbcReports],
        backgroundColor: ["#4CAF50", "#FF5733"], // Green for ECG, Orange for CBC
        hoverBackgroundColor: ["#45A049", "#FF4500"],
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
    <div className="flex flex-col items-center h-full w-full">
      <h1 className="text-lg font-bold mb-4 text-black">Test Reports Distribution</h1>
      <div className="w-[250px] h-[100%]">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default TestReportPieChart;
