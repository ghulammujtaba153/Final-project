// src/TopDoctors.js
import React from 'react';



const TopDoctors = ({doctors}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-5 w-full max-w-6xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">Top Doctors</h2>
      <ul className="w-full">
        {doctors.map((doctor, index) => (
          <li key={doctor.id} className="grid grid-cols-7 gap-4 items-center border-b border-gray-200 py-4 last:border-b-0">
            <span className="text-gray-600 font-bold">#{index + 1}</span>
            <img src={doctor.profilePic} alt={doctor.name} className="w-10 h-10 rounded-full object-cover" />
            <span className="text-gray-700 font-medium truncate">{doctor.name}</span>
            <span className="text-gray-600">{doctor.specialty}</span>
            <span className="text-gray-600">{doctor.reviews} Reviews</span>
            <span className="text-gray-600 truncate">{doctor.education}</span>
            <div className="text-yellow-500 flex">
              {'★'.repeat(Math.floor(doctor.rating))}
              {'☆'.repeat(5 - Math.floor(doctor.rating))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopDoctors;
