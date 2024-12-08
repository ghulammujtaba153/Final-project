"use client"
import { UserContext } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

const ConferencePage = () => {
    const { user } = useContext(UserContext);
    const [name, setName] = useState("");
    const [code, setCode] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setName(user.firstName);
        }
        const num = Math.floor(Math.random() * 1000000);
        setCode(num);
    }, [user]);

    const handleJoin = () => {
        const roomId = uuid(); // Generate a unique ID for the room
        router.push(`/room/${roomId}`);
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <p className='text-xl font-semibold mb-4'>Conference</p>
            <input 
                type="text" 
                value={name} 
                readOnly 
                className='mb-3 p-2 border rounded w-full'
            />
            <input 
                type="number" 
                value={code} 
                readOnly 
                className='mb-3 p-2 border rounded w-full'
            />
            <button 
                onClick={handleJoin} 
                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
                Join
            </button>
        </div>
    )
}

export default ConferencePage;
