"use client";

import React from 'react';
import TabContainer from '@/components/TabContainer';

const MainPage = () => {
  // Mock user data for demonstration
  const doctor = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    dateOfBirth: '1980-01-01',
    contactNumber: '1234567890',
    landlineNumber: '0987654321',
    postalAddress: '123 Main St',
    permanentAddress: '456 Elm St',
    specialization: 'Cardiology'
  };

  const admin = {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    dateOfBirth: '1975-06-15',
    contactNumber: '2345678901',
    landlineNumber: '1098765432',
    postalAddress: '789 Pine St',
    permanentAddress: '321 Oak St'
  };

  return (
      <div className='p-2'>
        <TabContainer />
        {/* Pass user data to DoctorProfile and AdminProfile as needed */}
        {/* <DoctorProfile />
        <AdminProfile /> */}
      </div>

  );
};

export default MainPage;
