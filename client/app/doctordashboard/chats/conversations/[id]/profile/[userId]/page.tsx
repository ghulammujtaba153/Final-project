"use client";
import API_BASE_URL from '@/utils/apiConfig';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Page = ({ params }: { params: { userId: string } }) => {
  const [personalData, setPersonalData] = useState<any>({});
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPersonalData = async () => {
      try {
        if (params?.userId) {
          // Fetch personal data
          const res = await axios.get(`${API_BASE_URL}/user/${params.userId}`);
          setPersonalData(res.data.user);

          // Fetch prescriptions
          const prescriptionRes = await axios.get(`${API_BASE_URL}/prescriptions/patient/${params.userId}`);
          
          // Sort prescriptions by issuedAt date in descending order
          const sortedPrescriptions = prescriptionRes.data.prescriptions.sort((a: any, b: any) => {
            return new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime();
          });
          
          setPrescriptions(sortedPrescriptions);
          console.log(sortedPrescriptions);
        }
      } catch (error) {
        console.error(error);
        setError('Error fetching data');
      }
    };
    fetchPersonalData();
  }, [params.userId]);

  return (
    <div className='flex flex-col items-center w-full pl-[80px] h-screen text-white gap-4'>
      <h1 className="text-2xl font-bold">Patient Details</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className='flex items-center gap-4'>
        {personalData.profile && (
          <img
            src={personalData.profile}
            alt="Profile"
            className='w-[50px] h-[50px] object-cover rounded-full'
          />
        )}
        <div className='flex flex-col gap-2'>
          <p className='text-lg font-bold'>
            {personalData.firstName} {personalData.lastName}
          </p>
          <p className='text-sm'>{personalData.email}</p>
        </div>
      </div>

      <div className='w-full max-w-2xl'>
        <h2 className='text-xl font-bold mt-6 mb-4'>Prescriptions</h2>
        {prescriptions.length > 0 ? (
          prescriptions.map((prescription) => (
            <div key={prescription._id} className='bg-white text-black-default rounded-md p-4 mb-4 shadow-md'>
              <div className='flex justify-between items-center mb-2'>
                <h3 className='text-lg font-semibold'>Medications</h3>
                <p className='text-sm text-gray-600'>
                  Issued At: {new Date(prescription.issuedAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                
                {prescription.medications.length > 0 ? (
                  prescription.medications.map((medication: any, index: number) => (
                    <div key={medication._id || index} className='border-b text-black-default border-gray-300 pb-2 mb-2'>
                      <p className="text-black-default"><strong>Name:</strong> {medication.name}</p>
                      <p><strong>Dosage:</strong> {medication.dosage}</p>
                      <p><strong>Frequency:</strong> {medication.frequency}</p>
                      <p><strong>Duration:</strong> {medication.duration}</p>
                      {medication.instructions && (
                        <p><strong>Instructions:</strong> {medication.instructions}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No medications prescribed.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No prescriptions found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
