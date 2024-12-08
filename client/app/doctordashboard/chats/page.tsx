"use client";


import React, { useContext, useEffect, useState } from 'react';
import ChatComponent from '@/components/dashboard/ChatComponent';



const ChatPage = () => {
    

    return (
        <div className='flex flex-col w-full pl-[50px] pr-[30px] h-screen'>
            <div>Chat Page</div>
            <ChatComponent/>
        </div>
    );
};

export default ChatPage;
