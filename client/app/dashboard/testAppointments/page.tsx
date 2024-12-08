'use client'; // Ensures this component runs on the client-side

import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/context/UserContext';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';
import Spinner from '@/components/Spinner';
import { useRouter } from 'next/Navigation';

// Define the types for the data you expect to receive
interface Test {
    _id: string;
    testName: string;
    picture: string;
    price: number;
    description: string;
    createdAt: string;
}

interface Appointment {
    _id: string;
    patientId: string;
    testId: Test;
    appointmentDate: string;
    appointmentTime: string;
}

const TestAppointmentPage: React.FC = () => {
    const { user } = useContext(UserContext);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router=useRouter();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/testAppointments/${user._id}`);
                // Reverse the appointments to show the latest first
                const sortedAppointments = res.data.testAppointment.reverse();
                console.log(sortedAppointments);
                setAppointments(sortedAppointments);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching appointments:', error);
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [user]);


    const handleClick = (id) => {
        router.push(`/dashboard/testAppointments/${id}`);
    }

    

    return (
        <div className="pl-[100px] h-screen">
            <h1 className="text-3xl font-bold mb-6 text-white">Test Appointments</h1>
            {
                loading? 
                <div className="flex items-center justify-center h-screen">
                    <Spinner />
                </div>
                :
                (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {appointments.map(appointment => (
                        <div onClick={()=>handleClick(appointment._id)} key={appointment._id} className="flex flex-col p-4 bg-white shadow-md rounded-lg hover:shadow-lg hover:bg-gray-200 cursor-pointer">
                            <img src={appointment.testId.picture} alt={appointment.testId.testName} className="w-full h-24 object-cover rounded-lg mb-4" />
                            <div>
                                <p className='inline-block px-2 py-1 text-sm font-medium text-white bg-green-500 rounded-full mb-2'>{appointment.status}</p>
                                <h2 className="text-xl font-semibold">{appointment.testId.testName}</h2>
                                <p className="text-gray-600">Date: {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                                <p className="text-gray-600">Time: {appointment.appointmentTime}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                )
            }

        </div>
    );
};

export default TestAppointmentPage;
