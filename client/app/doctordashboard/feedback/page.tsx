import FeedBack from '@/components/dashboard/FeedBack';
import React from 'react';

const Page: React.FC = () => {
  return (
    <div className="flex h-[100%] flex-col gap-4 items-center justify-center pl-[100px]">
      <h1 className="text-xl font-bold text-white">Rate us</h1>
      <FeedBack />
      <img src="/feedback.png" alt="Feedback" className="max-h-[600px] max-w-[600px] mb-8 object-cover" />
    </div>
  );
};

export default Page;
