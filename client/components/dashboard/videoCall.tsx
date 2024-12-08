import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';

const VideoCall = ({ videoCalls }) => {
  const { user } = useContext(UserContext);
  const [activeCall, setActiveCall] = useState(null);
  const [startedBy, setStartedBy] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (videoCalls.length > 0) {
      const recentCall = videoCalls[videoCalls.length - 1];
      setStartedBy(recentCall.startedBy._id);
      setActiveCall(recentCall); // Get the most recent call
    }
  }, [videoCalls]);

  console.log("active calll", activeCall)

  const handleJoinCall = async (activeCall: any) => {
    try {
      // Update the call status to 'completed'
      const res =await axios.put(`${API_BASE_URL}/videoCalls/${activeCall._id}/status`, { status: 'completed' });
      console.log("res update", res.data); 
      // Navigate to the 
      router.push(`/room/${activeCall.link}`);
    } catch (error) {
      console.error('Failed to update call status:', error);
    }
  };

  return (
    <div>
      {(activeCall && user._id !== startedBy) && (
        <div
          className='absolute top-4 right-4 flex flex-col items-center p-5 w-[300px] bg-white text-black-default rounded-lg shadow-md'
        >
          <p className='text-center'>Video call has been started</p>
          <div
            onClick={() => handleJoinCall(activeCall)}
            className='mt-2 p-2 bg-blue-500 text-white rounded-lg cursor-pointer'
          >
            Join
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
