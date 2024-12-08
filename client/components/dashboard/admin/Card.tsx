import React from 'react';

interface CardProps {
  data?: {
    icon: React.ReactNode;
    title: string;
    data: number | string;
  };
}

const Card: React.FC<CardProps> = ({ data }) => {
  if (!data) {
    return <div>No data provided</div>;
  }

  return (
    <div className='w-[200px] flex flex-col items-center justify-center gap-3 p-4 bg-white shadow-md rounded-lg'>
      <div className='w-full flex items-center justify-between text-lg font-semibold'>
        <div className="w-[50px] h-[50px] p-3 bg-red-100 rounded-lg mr-2 flex item-center justify-center">
            {data.icon}
        </div>
        <p>{data.title}</p>
      </div>
      <p className='text-2xl font-bold'>{data.data}</p>
    </div>
  );
}

export default Card;

