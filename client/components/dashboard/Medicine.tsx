"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "@/utils/apiConfig";
import { UserContext } from "@/context/UserContext";

const Medicine = () => {
  const [data, setData] = useState<any>(null);
  const [loadingState, setLoadingState] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/prescriptions/patient/${user._id}`);
        console.log(response.data)
        const latestPrescription = response.data.prescriptions[response.data.prescriptions.length - 1];
        setData(latestPrescription);
        
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      } finally {
        setLoadingState(false);
      }
    };

    fetchData();
  }, [user]);

  if (loadingState) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return (
      <div className="flex flex-col justify-center bg-white text-grey5 rounded-md w-full items-center p-4">
        <p className="font-bold text-lg">No medication</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center bg-white text-grey5 rounded-md w-full items-center p-4">
      <p className="font-bold text-lg">latest Medicine Schedule</p>
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <p>
          <strong>Created At: </strong>
          {new Date(data.createdAt).toLocaleDateString()}
        </p>

        {data.medications.length > 0 ? (
          data.medications.map((medication: any, index: number) => (
            <div
              key={index}
              className="flex flex-col gap-2 w-full max-w-md border-b py-2 px-4"
            >
              <div className="flex justify-between">
                <p><strong>Medicine:</strong> {medication.name}</p>
                <p><strong>Dosage:</strong> {medication.dosage}</p>
              </div>
              <div className="flex justify-between">
                <p><strong>Frequency:</strong> {medication.frequency}</p>
                <p><strong>Duration:</strong> {medication.duration}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="flex flex-col gap-2 w-full max-w-md border-b py-2 px-4">No medications prescribed.</p>
        )}

        <p className="mt-4">
          <strong>Next Review Date: </strong>
          {new Date(data.nextReviewDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Medicine;
