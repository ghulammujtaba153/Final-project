"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import API_BASE_URL from "@/utils/apiConfig";
import AppointmentsTable from "@/components/dashboard/AppointmentsTable";

function Assignments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all'); // New state for status
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const fetchUpcomingAppointments = async () => {
      if (!user) return;

      try {
        const userRes = await axios.get(`${API_BASE_URL}/doctors/${user._id}`);
        const res = await axios.get(`${API_BASE_URL}/appointments/all/doctor/${userRes.data._id}`);

        // Convert custom date format and sort appointments
        const appointmentsWithParsedDates = res.data.map((appointment) => ({
          ...appointment,
          parsedTiming: parseCustomDateFormat(appointment.timing),
        })).sort((a, b) => a.parsedTiming - b.parsedTiming);

        setAppointments(appointmentsWithParsedDates);
      } catch (error) {
        console.error('Error fetching upcoming appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingAppointments();
  }, [user]);

  useEffect(() => {
    const filtered = appointments.filter(appointment => {
      const fullName = `${appointment.patientId.firstName} ${appointment.patientId.lastName}`.toLowerCase();
      const appointmentDate = new Date(appointment.parsedTiming).setHours(0, 0, 0, 0);
      const selectedDate = searchDate ? new Date(searchDate).setHours(0, 0, 0, 0) : null;

      const nameMatch = fullName.includes(searchQuery.toLowerCase());
      const dateMatch = searchDate ? appointmentDate >= selectedDate : true;

      // Status filter: Only include appointments that match the selected status (or 'all' for all statuses)
      const statusMatch = selectedStatus === 'all' || appointment.status === selectedStatus;

      return nameMatch && dateMatch && statusMatch;
    });

    setFilteredAppointments(filtered);
  }, [searchQuery, searchDate, selectedStatus, appointments]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value); // Update status filter
  };

  // Function to parse the custom date format
  const parseCustomDateFormat = (dateString) => {
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-');
    let [hour, minute] = timePart.split(' ')[0].split(':');
    const period = timePart.split(' ')[1];
    
    // Convert hour to 24-hour format
    if (period === 'PM' && hour !== '12') {
      hour = parseInt(hour, 10) + 12;
    } else if (period === 'AM' && hour === '12') {
      hour = 0;
    }

    return new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500'></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-screen w-full pr-[30px] text-black">
      <div className="flex md:items-center justify-between gap-2 md:flex-row flex-col">
        <input 
          type="text" 
          placeholder="Search by patient's name" 
          value={searchQuery}
          onChange={handleInputChange}
          className="p-2 border rounded-md"
        />

        {/* Status Filter */}
        <select
          name="status"
          value={selectedStatus}
          onChange={handleStatusChange} // Trigger status filtering on change
          className="p-2 border rounded-md cursor-pointer"
        >
          <option value="all">All</option>
          <option value="new">New</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <input 
          type="date"
          value={searchDate}
          onChange={handleDateChange}
          className="p-2 border rounded-md"
        />
      </div>
      <AppointmentsTable appointments={filteredAppointments} />
    </div>
  );
}

export default Assignments;
