"use client";
import API_BASE_URL from '@/utils/apiConfig';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const AppointmentDetails = ({ params: { id } }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/prescriptions/${id}`);
        const prescriptionData = res.data.prescriptions[0];
        console.log(res.data)
        console.log(res.data.prescriptions[0].length)
        setData(prescriptionData);
      } catch (error) {
        console.error('Error fetching prescription data:', error);
      }
    };
    fetchData();
  }, [id]);

  const formatTiming = (timing) => {
    let formattedTiming;
    if (moment(timing, moment.ISO_8601, true).isValid()) {
      formattedTiming = moment(timing).format("YYYY-MM-DD hh:mm A");
    } else {
      console.warn("Invalid date format detected. Attempting manual parsing.");
      formattedTiming = moment(timing, "YYYY-MM-DDThh:mm A").format("YYYY-MM-DD hh:mm A");
    }
    return formattedTiming;
  };

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className='h-screen w-full flex pl-[80px] justify-center items-center flex-col text-white'>
        <p>No Prescription yet</p>
      </div>
    );
  }
  

  return (
    <div className="h-screen w-full flex pl-[130px] flex-col text-white">
      <h1 className="text-2xl text-center mb-6">Appointment Details</h1>

      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          <img
            src={data?.patientId?.profile}
            alt="Doctor's profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold">
              {data?.patientId?.firstName} {data?.patientId?.lastName}
            </p>
            <p className="text-sm text-gray-400">Email: {data?.patientId?.email}</p>
          </div>
        </div>
        <p className="text-lg font-semibold">
          Appointment Date: {data?.appointmentId?.timing ? formatTiming(data?.appointmentId.timing) : "N/A"}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Medications:</h2>
        {data?.medications?.length > 0 ? (
          <div className="flex flex-col gap-2">
            {data?.medications.map((medication, index) => (
              <li key={index} className="mb-2">
                <p className="font-medium">{medication.name}</p>
                <p>Dosage: {medication.dosage}</p>
                <p>Frequency: {medication.frequency}</p>
                <p>Duration: {medication.duration}</p>
                {medication.instructions && (
                  <p>Instructions: {medication.instructions}</p>
                )}
              </li>
            ))}
          </div>
        ) : (
          <p>No medications prescribed.</p>
        )}
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold">
          Issued At: {data?.issuedAt ? formatTiming(data?.issuedAt) : "N/A"}
        </p>
      </div>

      {data?.notes && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Notes:</h2>
          <p>{data.notes}</p>
        </div>
      )}

      {data?.nextReviewDate && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Next Review Date:</h2>
          <p>{formatTiming(data.nextReviewDate)}</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentDetails;
