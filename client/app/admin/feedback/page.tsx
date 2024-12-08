"use client"

import Spinner from '@/components/Spinner';
import FeedbackTable from '@/components/dashboard/admin/FeedbackTable';
import API_BASE_URL from '@/utils/apiConfig';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const page = () => {
  const [data, setData]=useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/feedback`);
        setData(res.data);
        console.log(res.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  if (loading) {
    return <div className='flex justify-center items-center h-screen'>
      <Spinner />
    </div>;
  }

  return (
    <div className="flex items-center flex-col p-4 h-screen gap-4">
      <h1 className="text-white mb-4 mt-4 text-xl font-bold">Feedback</h1>
      <FeedbackTable feedbackData={data}/>
    </div>
  )
}

export default page