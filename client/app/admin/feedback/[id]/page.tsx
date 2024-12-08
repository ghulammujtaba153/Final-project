"use client"
import Spinner from '@/components/Spinner';
import StarRating from '@/components/dashboard/StarRatings';
import API_BASE_URL from '@/utils/apiConfig';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Props {
  params: {
    id: string;
  };
}

const Page = ({ params }: Props) => {
  const { id } = params;
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/feedBack/${id}`);
        setData(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setLoading(false); // Stop spinner even in case of error
      }
    };
    fetch();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center pl-[100px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen pl-[100px]">
      <h1 className="text-bold mb-4 text-xl">Feedback Details</h1>
      <div className="flex items-center justify-center gap-2">
        <img
          src={data.userId?.profile} 
          alt={`${data.userId?.firstName}'s profile picture`}
          className="w-[40px] h-[40px] rounded-full"
        />
        <div className="flex flex-col gap-1">
          <p>{data.userId?.firstName} {data.userId?.lastName}</p>
          <p className="text-sm text-gray-400">{data.userId?.email}</p>
        </div>
      </div>
      <p>Role: {data.userId?.role}</p>
      <p>Rating: <StarRating num={data.rating} /></p>
      <p>Things Liked: {data.liked}</p>
      <p>Things Disliked: {data.disliked}</p>
      <p>Suggestion: {data.suggestion}</p>
    </div>
  );
}

export default Page;
