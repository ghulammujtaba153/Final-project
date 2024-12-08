"use client"
import AppointmentsTable from '@/components/dashboard/admin/AppointmentsTable';
import API_BASE_URL from '@/utils/apiConfig';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    patientName: '',
    doctorName: '',
    status: 'all',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/appointments/all`);
        setData(res.data);
        setFilteredData(res.data);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    let filtered = data;

    // Filter by patient name
    if (filters.patientName) {
      filtered = filtered.filter((appointment) =>
        `${appointment.patientId.firstName} ${appointment.patientId.lastName}`
          .toLowerCase()
          .includes(filters.patientName.toLowerCase())
      );
    }

    // Filter by doctor name
    if (filters.doctorName) {
      filtered = filtered.filter((appointment) =>
        `${appointment.doctorId.firstName} ${appointment.doctorId.lastName}`
          .toLowerCase()
          .includes(filters.doctorName.toLowerCase())
      );
    }

    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter((appointment) => appointment.status === filters.status);
    }

    setFilteredData(filtered);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error loading appointments.</div>;

  return (
    <div className="container mx-auto pl-[100px] pr-[100px] py-10 h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Appointments</h1>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by patient name"
          name="patientName"
          value={filters.patientName}
          onChange={handleFilterChange}
          className="border border-gray-300 text-black outline-none rounded-md px-4 py-2 w-full md:w-1/3"
        />
        <input
          type="text"
          placeholder="Search by doctor name"
          name="doctorName"
          value={filters.doctorName}
          onChange={handleFilterChange}
          className="border border-gray-300 text-black outline-none rounded-md px-4 py-2 w-full md:w-1/3"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="border border-gray-300 text-black outline-none rounded-md px-4 py-2 w-full md:w-1/6"
        >
          <option value="all">All</option>
          <option value="new">New</option>
          <option value="completed">Completed</option>
        </select>
        <button
          onClick={applyFilters}
          className="bg-secondary hover:bg-orange-600 text-white px-4 py-2 rounded-md w-full md:w-auto"
        >
          Apply Filters
        </button>
      </div>

      <AppointmentsTable appointments={filteredData} />
    </div>
  );
};

export default Page;
