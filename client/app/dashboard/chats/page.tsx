"use client";

import { UserContext } from '@/context/UserContext';
import React, { useContext, useEffect, useState } from 'react';

import ChatComponent from '@/components/dashboard/ChatComponent';



const ChatPage = () => {
    

    return (
        <div className="pr-[100px] w-full h-screen">
            <ChatComponent/>
        </div>
    );
};

export default ChatPage;
