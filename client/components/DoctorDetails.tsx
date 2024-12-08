import React from 'react';
import MagicButton from './MagicButton';
import { FaLocationArrow } from 'react-icons/fa';
import { AppoitmentModal } from './AppointmentModal';

const DoctorDetails = ({ doctor }) => {
  // Ensure doctor is defined before accessing its properties
  if (!doctor) {
    return <div>Loading doctor details...</div>;
  }
  console.log(doctor);

  const { userId, specialization, doctor_qualification, availability, fee, experience } = doctor;

  return (
    <div className='flex flex-col'>
      <div className="flex justify-around p-20 gap-5 md:flex-row flex-col">
      <div className="">
        <p className='flex-1 text-4xl font-bold'>{userId.firstName} {userId.lastName}</p>
        <p className="mt-4">Contact:</p>
        <p className="text-gray-300 text-sm">{userId.email}</p>
        <p className="text-gray-300 text-sm">{userId.contactNumber}</p>
        <p className="mt-2">Specialization</p>
        <p className="text-gray-300 text-sm">{specialization}</p>
        <p className="mt-2">Experience</p>
        <p className="text-gray-300 text-sm">{experience}</p>
        <p className="mt-2">Qualifications</p>
        {doctor_qualification.map((qualification, index) => (
          <p key={index} className="text-gray-300 text-sm">
            {qualification.qualificationName} ({qualification.startYear} - {qualification.endYear})
          </p>
        ))}
        <p className="mt-2">Availability</p>
        <p className="text-gray-300 text-sm">{availability.startTime}</p>
        <div className="flex justify-center">
          <AppoitmentModal />
        </div>
      </div>
        <div className=''>
          <img src={userId.profile} alt="Doctor Profile" className='md:h-[500px] md:w-[500px] rounded-lg h-[150px] w-full md:object-cover object-contain' />
        </div>
      </div>
          <p>ahjlahdj</p>

    </div>
    
  );
}

export default DoctorDetails;
