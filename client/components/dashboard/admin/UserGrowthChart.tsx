// src/UserGrowthChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserGrowthChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Doctors" stroke="#8884d8" />
        <Line type="monotone" dataKey="Patients" stroke="#82ca9d" />
        <Line type="monotone" dataKey="LabOperators" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UserGrowthChart;
