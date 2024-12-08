'use client';

import React, { useEffect, useState } from 'react';
import DoctorsTable from '@/components/dashboard/admin/DoctorsTable';
import { fetchDoctors } from '@/redux/slices/doctorsSlice';
import Spinner from '@/components/Spinner';
import { useDispatch, useSelector } from 'react-redux';

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { doctors, loading, error } = useSelector((state: RootState) => state.doctors);

  useEffect(() => {
      dispatch(fetchDoctors());
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor?.userId?.firstName} ${doctor?.userId?.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto h-screen p-4">
      <div className="w-full overflow-x-auto">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full max-w-lg p-3 text-black rounded-md shadow-sm focus:outline-none mb-4"
        />
        <DoctorsTable doctors={filteredDoctors} />
      </div>
    </div>
  );
};

export default DoctorsPage;
