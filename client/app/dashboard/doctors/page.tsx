"use client";
import { DoctorList } from '@/components/DoctorList';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';
import Spinner from '@/components/Spinner';
import { Search } from 'lucide-react';

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term
  const [feeRange, setFeeRange] = useState<number>(2000); // State for fee range, default 2000
  const [specialization, setSpecialization] = useState<string>(""); // State for specialization

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/doctors`);
        console.log(res.data);
        setDoctors(res.data);
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };

    fetchDoctors();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFeeRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeeRange(Number(event.target.value));
  };

  const handleSpecializationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSpecialization(event.target.value);
  };

  // Filter doctors based on search term (by first and last name), fee range, and specialization
  const filteredDoctors = doctors.filter((doctor: any) => {
    const nameMatches = `${doctor.userId.firstName} ${doctor.userId.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const feeMatches = doctor.fee <= feeRange;

    const specializationMatches =
      specialization === '' || doctor.specialization === specialization;

    return nameMatches && feeMatches && specializationMatches;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="bg-black-100 py-[40px] text-white flex items-center flex-col h-screen">
        <div className="w-full mx-auto mr-10 flex items-center justify-around lg:flex-row flex-col gap-2 ">
          {/* Fee Range Filter */}
          <div className="flex items-center space-x-4">
            <label htmlFor="feeRange" className="text-white">Fee Range: {feeRange}</label>
            <input
              type="range"
              id="feeRange"
              min="200"
              max="2000"
              value={feeRange}
              onChange={handleFeeRangeChange}
              className="slider cursor-pointer"
            />
          </div>

          {/* Specialization Filter */}
          <div className="flex items-center justify-between gap-2">
            <label className="flex text-white">Specialization</label>
            <select
              id="specialization"
              className="bg-white border rounded p-2 mb-4 text-black"
              value={specialization}
              onChange={handleSpecializationChange}
            >
              <option value="">Select Specialization</option> 
              <option value="Cardiology">Cardiology</option>
              <option value="Hematology">Hematology</option>
              <option value="Radiology">Radiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Ophthalmology">Ophthalmology</option>
            </select>
          </div>

          {/* Search Input */}
          
            <input
              id="search"
              placeholder="Search by name"
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="bg-white text-black p-2 rounded-md"
            />
          
        </div>

        {filteredDoctors.length > 0 ? (
          <div>
            <DoctorList doctors={filteredDoctors} /> 
          </div>
        ) : (
          <div className="bg-black-100 py-[40px] text-white flex items-center justify-center flex-col pl-[80px] h-screen">
            <p>No doctors found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Doctor;
