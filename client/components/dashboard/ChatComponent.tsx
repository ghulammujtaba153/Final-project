"use client";

import { UserContext } from '@/context/UserContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import API_BASE_URL from '@/utils/apiConfig';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';
import '../../app/scroll.css';


const ChatComponent = () => {
    const { user } = useContext(UserContext);
    const [conversations, setConversations] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const router = useRouter();

    const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []); 

  useEffect(() => {
    if (!user){
        return;
    }
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
        console.log(users)
        setOnlineUsers(users.map(user => user.userId));
    });
},[user]);

    

    useEffect(() => {
        if (user) {

            console.log('user', user);

            // Fetch conversations
            const fetchChats = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}/conversations/user/${user._id}`);
                    setConversations(response.data);
                } catch (error) {
                    console.error('Error fetching conversations:', error);
                }
            };
            fetchChats();
        }
    }, [user]);

    

    const handleConversationClick = (id) => {
        if(user.role==="doctor"){
            router.push(`/doctordashboard/chats/conversations/${id}`);
        }else{
            router.push(`/dashboard/chats/conversations/${id}`);
        }
        
    };

    const isOnline = (participantId) => onlineUsers.includes(participantId);

    return (
            <div className='prescription-container flex flex-col h-[80%] w-full m-4 overflow-y-scroll'>
                {conversations && conversations.map((conversation) => (
                    <div key={conversation._id} >
                        {conversation.participants.map((participant) => (
                            participant._id !== user._id && (
                                <div
                                    onClick={() => handleConversationClick(conversation._id)}
                                    key={participant._id}
                                    className='flex p-2 border-collapse border-b-2 border-black-500 bg-white cursor-pointer items-center hover:bg-secondary'>
                                    <img src={participant.profile} alt="Profile" className='w-[40px] h-[40px] rounded-full' />
                                    <div className='flex flex-col gap-2 p-2'>
                                        <p className='text-lg font-bold text-primary'>{participant.firstName} {participant.lastName}</p>
                                    </div>
                                    <p
                                    className={`text-sm px-2 py-1 rounded-full text-white ${
                                        onlineUsers.includes(participant._id) ? 'bg-green-300' : 'bg-red-300'
                                    }`}
                                    >
                                    {onlineUsers.includes(participant._id) ? 'Online' : 'Offline'}
                                    </p>
                                </div>
                            )
                        ))}
                    </div>
                ))}
            </div>
    );
};

export default ChatComponent;
