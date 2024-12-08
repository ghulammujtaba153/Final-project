"use client";

import React, { useContext, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';
import { Phone, Send, ShieldPlus, Star, Video } from 'lucide-react';
import Message from '@/components/Message';
import { UserContext } from '@/context/UserContext';
import { v4 as uuid } from 'uuid';
import VideoCall from '@/components/dashboard/videoCall';
import { io } from 'socket.io-client';
import Prescription from '@/components/dashboard/Prescription';
import '../../scroll.css'
import PatientReviewModal from '@/components/dashboard/PatientReview';

const Loader = () => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div className="text-white">Loading...</div>
  </div>
);

const ErrorMessage = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded-md shadow-md">
      <p className="text-red-500">{message}</p>
      <button onClick={onClose} className="mt-2 p-2 bg-blue-500 text-white rounded-md">Close</button>
    </div>
  </div>
);

const ConversationPage = ({ params }: { params: { id: string } }) => {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [participant, setParticipant] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, setParticipants } = useContext(UserContext);
  const [videoCalls, setVideoCalls] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState({});
  const [prescription, setPrescription] = useState(false);
  const [review, setReview]=useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  
  const messagesEndRef = useRef(null);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
   
    socket.current.on("getMessage", (data: any) => {
      console.log(data)
      setArrivalMessage({
        sender: data.senderId,
        content: data.content,
        createdAt: Date.now(),
      });
    });
  }, []);  

  useEffect(() => {
    if (!user){
        return;
    }
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
        console.log(users)
    });
  },[user]);

  useEffect(() => {
    console.log(arrivalMessage)
    if (arrivalMessage && conversation?.participants.find(participant => participant._id !== arrivalMessage.senderId)) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, conversation]);

  useEffect(() => {
    if (user) {
      socket.current.on("getUsers", (users) => {
        console.log(users);
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchCalls = async () => {
      if (!user) {
        console.error('User is not available');
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/videoCalls/user/${user._id}/active`);
        setVideoCalls(res.data);
      } catch (error) {
        console.error('Error fetching video calls:', error);
      }
    };
    fetchCalls();
  }, [user]);

  const fetchConversation = async () => {
    if (!user) {
      console.error('User is not available');
      return;
    }

    try {
      const res = await axios.get(`${API_BASE_URL}/conversations/${params.id}`);
      setMessages(res.data.messages);
      setConversation(res.data);
      console.log(res.data);

      const otherParticipant = res.data.participants.find(
        (p) => p._id !== user._id
      );
      setParticipant(otherParticipant?._id);
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };

  useEffect(() => {
    fetchConversation();
  }, [params.id, user]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom(); // Scroll down when conversation or messages update
  }, [messages]);

  const handleJoin = async () => {
    setIsLoading(true);
    setError('');

    if (!user) {
      setError('User is not logged in');
      setIsLoading(false);
      return;
    }

    try {
      if (participant) {
        const roomId = uuid();
        setParticipants([user._id, participant]);
        console.log(participant);
        const room = await axios.put(`${API_BASE_URL}/videoCalls/${roomId}/status`, {
          status: 'completed',
        });
        console.log(room);
        router.push(`/room/${roomId}`);
      } else {
        setError('Participant not found');
      }
    } catch (err) {
      setError('Failed to join the room. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: user._id,
            content: newMessage,
            createdAt: new Date(),
          },
        ]);

        const receiverId = conversation.participants.find(
          (member) => member._id !== user._id
        );
    
        socket.current.emit("sendMessage", {
          senderId: user._id,
          receiverId: receiverId._id,
          content: newMessage,
        });
            
        await axios.post(
          `${API_BASE_URL}/conversations/${params.id}/messages`,
          {
            sender: user._id,
            content: newMessage,
          }
        );
        setNewMessage('');
        scrollToBottom(); // Scroll down when a new message is sent
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  if (!user) return <p>Loading user information...</p>;

  return (
    <div className=" relative flex flex-col max-w-[1000px] h-screen bg-red-100 mx-auto">
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} onClose={() => setError('')} />}

      <div className="flex items-center justify-between p-4 bg-red-300">
        <div className="flex items-center">
          {conversation?.participants?.map((participant, index) => (
            user._id !== participant._id && (
              <div key={index} className="flex items-center">
                <img
                  src={participant.profile}
                  alt="profile"
                  className="w-[40px] h-[40px] rounded-full"
                />
                <p className="ml-2">
                  {participant.firstName + " " + participant.lastName}
                </p>
              </div>
            )
          ))}
        </div>
        <div className="flex items-center gap-4">
          {conversation?.appointmentId.doctorId === user._id ? (
            <div className="p-3 cursor-pointer bg-red-500 rounded-md" onClick={()=>setPrescription(!prescription)}><ShieldPlus /></div>
          ):(
            <div className="p-3 cursor-pointer bg-red-500 rounded-md" onClick={()=>setIsReviewModalOpen(true)}><Star /></div>
          )}
          {/* <div className="p-3 cursor-pointer bg-red-500 rounded-md" onClick={()=>setPrescription(!prescription)}><ShieldPlus /></div> */}
          {prescription && (
            <div className="absolute inset-0 flex items-center justify-center z-50 bg-opacity-75 bg-black">
              <Prescription users={conversation?.participants} appointmentId={conversation?.appointmentId._id} setPrescription={setPrescription} />
            </div>
          )}

          
          <div onClick={handleJoin} className="p-3 cursor-pointer bg-red-500 rounded-md">
            <Video />
          </div>
        </div>
      </div>

      <div className="prescription-container flex-grow w-full overflow-auto p-4">
        {messages?.map((message, index) => (
          <Message key={index} message={message} own={user._id === message.sender} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center w-full ">
        <input
          type="text"
          placeholder="write your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full h-full p-2 text-md border outline-none border-gray-300 rounded-md"
        />
        <div className="p-6 bg-green-300 cursor-pointer" onClick={handleSendMessage}>
          <Send />
        </div>
      </div>

      {videoCalls.length > 0 && (
        <div className="absolute top-[70px] right-[20px] w-[250px]">
          <VideoCall videoCalls={videoCalls} />
        </div>
      )}

      {isReviewModalOpen && (
              <PatientReviewModal
                open={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                appointmentId={conversation?.appointmentId?._id}
                users={conversation?.participants}
              />
            )}
    </div>
  );
};

export default ConversationPage;
