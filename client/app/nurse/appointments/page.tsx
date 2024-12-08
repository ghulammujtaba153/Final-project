"use client";

import Spinner from '@/components/Spinner';
import TestAppointmentTable from '@/components/dashboard/nurse/AppointmentsTable';
import API_BASE_URL from '@/utils/apiConfig';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Patient {
  _id: string;
  profile: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
}

interface Test {
  _id: string;
  testName: string;
}

interface Data {
  _id: string;
  fullName: string;
  email: string;
  contactNumber: string;
  testName: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
}

const AppointmentPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);
  const [searchName, setSearchName] = useState('');
  const [searchTest, setSearchTest] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/testappointments/all`);
        console.log(res.data);

        const transformedData = res.data.testAppointments.map((item: any) => ({
          _id: item._id,
          avatar: item.patientId.profile,
          fullName: `${item.patientId.firstName} ${item.patientId.lastName}`,
          email: item.patientId.email,
          contactNumber: item.patientId.contactNumber,
          testName: item.testId.testName,
          appointmentDate: item.appointmentDate,
          appointmentTime: item.appointmentTime,
          status: item.status,
        }));

        setData(transformedData); // Adjust according to your API response structure
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleSearchNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleSearchTestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTest(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  // Filter data based on search and date
  const filteredData = data.filter(item =>
    item.fullName.toLowerCase().includes(searchName.toLowerCase()) &&
    item.testName.toLowerCase().includes(searchTest.toLowerCase()) &&
    (selectedDate ? new Date(item.appointmentDate).toISOString().split('T')[0] === selectedDate : true)
  );

  return (
    <div className='flex flex-col h-screen'>
      <h1 className='text-4xl font-bold text-center mb-4 text-white'>Appointments</h1>
      <div className='flex items-center justify-between w-full mb-4'>
        <input
          type="text"
          placeholder='Search by name'
          value={searchName}
          onChange={handleSearchNameChange}
          className='bg-ray-300 border p-2 text-black'
        />
        <input
          type="text"
          placeholder='Search by test'
          value={searchTest}
          onChange={handleSearchTestChange}
          className='border p-2 text-black'
        />
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className='border p-2 text-black'
        />
      </div>
      {loading ? (
        <div className='flex items-center justify-center h-screen'>
          <Spinner />
        </div>
      ) : (
        <TestAppointmentTable data={filteredData} />
      )}
    </div>
  );
};

export default AppointmentPage;
