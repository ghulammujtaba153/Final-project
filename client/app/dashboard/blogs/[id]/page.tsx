"use client"

import API_BASE_URL from '@/utils/apiConfig';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const Page = ({ params: { id } }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/blogs/${id}`);
        const blogData = response.data;
        setData(blogData);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };
    fetchBlog();
  }, [id]);

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-4 flex flex-col items-center">
      {data ? (
        <div>
          <h1 className="text-3xl font-bold mb-1">{data.title}</h1>
          <div className='flex items-center gap-2 mb-4'>
            <img
                src={data?.author.profile}
                alt={data?.title}
                className="w-[40px] h-[40px] rounded-full"
            /> 
            <p className="flex flex-col justify-between text-gray-500">
                <span className="font-medium">{data.author?.firstName + " " + data.author?.lastName || "Unknown"}</span>{" "}
                <span>{moment(data?.createdAt).fromNow()}</span>
            </p>

          </div>
          
                 
          
          <img
            src={data?.coverImage}
            alt={data?.title}
            className="w-full max-h-[200px] rounded-md mb-4"
          />
          <p className="text-lg mb-2">{data.description}</p>
          <div
            className="blog-content text-base"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;
