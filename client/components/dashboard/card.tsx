import React from 'react';

interface CardProps {
  data: {
    title: string;
    num: number;
  };
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <div className='flex flex-col items-center bg-white-200 px-10 py-5 rounded-lg shadow-[22px_20px_20px_41px_#00000024] gap-5'>
      <p>{data.title}</p>
      <p className='font-bold'>{data.num}</p>
    </div>
  );
};

export default Card;
