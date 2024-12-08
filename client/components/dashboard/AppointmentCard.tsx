"use client";

import React, { useContext } from "react";
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import { useRouter } from "next/navigation";
import API_BASE_URL from "@/utils/apiConfig";
import axios from "axios";
import { UserContext } from "@/context/UserContext";

export function AppointmentCard({ cardData }) {
  // Function to format date and time
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const date = dateTime.toLocaleDateString(); // e.g., "8/17/2024"
    const time = dateTime.toLocaleTimeString(); // e.g., "10:00:00 AM"
    return `${date} ${time}`;
  };

  const { user } = useContext(UserContext);

  const router = useRouter();
  console.log(cardData)

  const handleCardClick = () => {
    // Navigate to the conversation page with the card data
    // Extract patientId and doctorId from cardData
    
    const patientId = cardData.patientId._id;
    const doctorId = cardData.doctorId;

    // Fetch conversation or create a new one
    fetchConversationOrCreate(patientId, doctorId);
  };

  const fetchConversationOrCreate = async (patientId, doctorId) => {
    try {
      // Fetch conversation room
      const userRes = await axios.get(`${API_BASE_URL}/doctors/${user._id}`);
      console.log(userRes.data)
      const doctorId=userRes.data.userId._id;

      const conversationRes = await axios.get(`${API_BASE_URL}/conversations/doctor/${doctorId}/patient/${patientId}`);
      const conversationData = conversationRes.data;
      console.log(conversationRes.data)

      if (conversationData) {
        // If conversation exists, navigate to it
        router.push(`/conversations/${conversationData._id}`);
      } else {
        console.log("nulll")
        const newConversationRes = await axios.post(`${API_BASE_URL}/conversations/create`, {
          participants: [doctorId, patientId],
        });
        const newConversationData = newConversationRes.data;
        router.push(`/conversations/${newConversationData._id}`);
      }
    } catch (error) {
      console.error('Error handling card click:', error);
    }
  };

  return (
    <div onClick={handleCardClick}>
      <CardContainer className="inter-var w-[90%]">
        <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] text-white dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border cursor-pointer">
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className="w-15 h-15">
                <img
                  src={cardData?.patientId?.profile}
                  height={60}
                  width={60}
                  className="object-cover rounded-full group-hover/card:shadow-xl"
                  alt="Profile"
                />
              </div>
              <CardItem 
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {cardData?.patientId?.firstName + " " + cardData?.patientId?.lastName}
              </CardItem>
            </div>
            <div className="font-bold">
              Status: <span className="text-white-200">{cardData?.status}</span>
            </div>
          </div>
          
          <div className='flex items-center justify-between'>
            <div>
              <p className="font-bold">Medication</p>
              <p className="text-white-200">Medicine 1</p>
            </div>
            <div>
              <p className="font-bold">Timing</p>
              <p className="text-white-200">{formatDateTime(cardData?.timing)}</p>
            </div>
          </div>    
        </CardBody>
      </CardContainer>
    </div>
  );
}
