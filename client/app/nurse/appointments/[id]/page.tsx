"use client";
import Spinner from "@/components/Spinner";
import API_BASE_URL from "@/utils/apiConfig";
import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import ECGuploadModal from "@/components/dashboard/nurse/ECGuploadModal";
import CBCuploadModal from "@/components/dashboard/nurse/CBCuploadModal";
import OralDiseaseModal from "@/components/dashboard/nurse/OralDiseaseModal";
import BrainTumorModal from "@/components/dashboard/nurse/BrainTumorModal";

interface TestAppointmentDetailsProps {
  params: {
    id: string;
  };
}

const TestAppointmentDetails: React.FC<TestAppointmentDetailsProps> = ({ params: { id } }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [reportType, setReportType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios(`${API_BASE_URL}/testAppointments/test/${id}`);
        setData(res.data.testAppointment);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch appointment details:", error);
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const formatTiming = (date: Date | string, time?: string): { date: string; time: string } => {
    const formattedDate = moment(date).format("MMMM DD, YYYY"); // Month name, day, and year
    const formattedTime = time ? moment(time, "HH:mm").format("hh:mm A") : "N/A"; // Time in AM/PM format
    return { date: formattedDate, time: formattedTime };
  };

  const handleReportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReportType(e.target.value);
  };

  useEffect(() => {
    if (reportType) setIsModalOpen(true);
  }, [reportType]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setReportType("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Unable to load appointment details. Please try again later.</p>
      </div>
    );
  }

  const timing = data.appointmentDate
    ? formatTiming(data.appointmentDate, data.appointmentTime)
    : { date: "N/A", time: "N/A" };

  return (
    <div className="flex flex-col md:flex-row h-screen px-8 py-4">
      {/* Left Section: API Details */}
      <div className="flex-1 flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-center mb-4">Appointment Details</h1>
        <div className="flex items-center gap-4">
          <img
            src={data.patientId?.profile || "/default-profile.png"}
            alt="Patient's profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold">
              {data.patientId?.firstName} {data.patientId?.lastName}
            </p>
            <p className="text-sm text-gray-500">Email: {data.patientId?.email || "N/A"}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow text-black text-center flex-1">
            <h2 className="text-lg font-semibold">Date</h2>
            <p>{timing.date}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow text-black text-center flex-1">
            <h2 className="text-lg font-semibold">Time</h2>
            <p>{timing.time}</p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Test Details</h2>
          <p>Test Name: {data.testId?.testName || "N/A"}</p>
          <p>Price: {data.testId?.price || "N/A"}</p>
          <p>Description: {data.testId?.description || "N/A"}</p>
        </div>
        <select
          value={reportType}
          onChange={handleReportChange}
          className="border border-gray-300 p-2 text-black rounded-md"
        >
          <option value="" disabled>
            Select Report Type
          </option>
          <option value="ECG">ECG Report</option>
          <option value="CBC">CBC Report</option>
          <option value="OralDisease">Oral Disease Report</option>
          <option value="BrainTumor">Brain Tumor Report</option>
        </select>
        {isModalOpen && (
          <>
            {reportType === "ECG" && <ECGuploadModal id={id} onClose={handleModalClose} />}
            {reportType === "CBC" && <CBCuploadModal id={id} onClose={handleModalClose} />}
            {reportType === "OralDisease" && <OralDiseaseModal id={id} onClose={handleModalClose} />}
            {reportType === "BrainTumor" && <BrainTumorModal id={id} onClose={handleModalClose} />}
          </>
        )}
      </div>

      {/* Right Section: Static Image */}
      <div className="hidden md:flex w-1/2 justify-center items-center">
        <img src="/feedback.png" alt="Static Illustration" className="max-w-full rounded-lg shadow" />
      </div>
    </div>
  );
};

export default TestAppointmentDetails;
