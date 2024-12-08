import FeedBack from '@/components/dashboard/FeedBack';
import React from 'react';

const Page: React.FC = () => {
  return (
    <div className="flex flex-col h-[100%] items-center justify-center gap-4">
      <h1 className="text-xl font-bold text-white">Rate us</h1>
      <FeedBack />
      <img src="/feedback.png" alt="Feedback" className="max-h-[600px] max-w-[600px] mb-8 object-cover" />
    </div>
  );
};

export default Page;
