"use client";

import React, { useState } from 'react';
import DoctorProfile from './DoctorProfile'; // Import the DoctorProfile component
import AdminProfile from './AdminProfile';   // Import the AdminProfile component
import NurseProfile from './NurseProfile';   // Import the NurseProfile component

const TabContainer = () => {
  const [activeTab, setActiveTab] = useState('doctor');

  return (
    <div className='flex flex-col items-center rounded-lg overflow-hidden'>
      <div className='flex space-x-2'>
        <button


          className={`px-4 py-2 rounded-full ${
            activeTab === 'doctor' ? 'bg-secondary text-primary' : 'bg-gray-200 text-black'
          }`}

          onClick={() => setActiveTab('doctor')}
        >
          Doctor
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            activeTab === 'admin' ? 'bg-secondary text-primary' : 'bg-gray-200 text-black'
          }`}
          onClick={() => setActiveTab('admin')}
        >
          Admin
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            activeTab === 'nurse' ? 'bg-secondary text-primary' : 'bg-gray-200 text-black'
          }`}
          onClick={() => setActiveTab('nurse')}
        >
          Nurse
        </button>
      </div>
      <div className='w-full mt-4'>
        {activeTab === 'doctor' && <DoctorProfile />}
        {activeTab === 'admin' && <AdminProfile />}
        {activeTab === 'nurse' && <NurseProfile />}
      </div>
    </div>
  );
};

export default TabContainer;
