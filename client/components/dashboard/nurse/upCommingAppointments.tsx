"use client";

import React, { useEffect, useState } from "react";

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with dummy data
    setTimeout(() => {
      setAppointments([
        {
          id: "1",
          profilePic: "https://via.placeholder.com/48",
          fullName: "John Doe",
          time: "2024-11-23 10:00 AM",
        },
        {
          id: "2",
          profilePic: "https://via.placeholder.com/48",
          fullName: "Jane Smith",
          time: "2024-11-23 11:00 AM",
        },
        {
          id: "3",
          profilePic: "https://via.placeholder.com/48",
          fullName: "Emily Johnson",
          time: "2024-11-23 1:00 PM",
        }
      ]);
      setLoading(false);
    }, 1000); // Simulate 1 second delay
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full text-black">
      <h1 className="text-lg font-bold mb-4">Upcoming Appointments</h1>
      {appointments.length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        <ul className="space-y-3">
          {appointments.map((appointment) => (
            <li
              key={appointment.id}
              className="flex items-center justify-between p-3.5 bg-gray-100 rounded-lg shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={appointment.profilePic}
                  alt={appointment.fullName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold">{appointment.fullName}</p>
                  <p className="text-sm text-gray-500">{appointment.time}</p>
                </div>
              </div>
              <button
                className="px-4 ml-2 py-2 text-sm font-semibold text-white bg-secondary rounded-lg hover:bg-orange-600"
                onClick={() => alert(`Details for ${appointment.fullName}`)}
              >
                Details
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingAppointments;
