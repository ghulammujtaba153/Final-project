import React from 'react';

const StatCard = ({ icon, iconBg, title, subtitle }) => {
  return (
    <div className="bg-gradient-to-br from-white to-[#f9faff] rounded-xl flex items-center p-5 h-24 w-48 shadow-md hover:scale-105 transition-transform duration-300 ease-in-out">
      <div
        className="w-10 h-10 rounded-full flex justify-center items-center mr-5"
        style={{ backgroundColor: iconBg }} // Dynamically set icon background
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-lg font-bold text-gray-800">
          {title}
        </div>
        <div className="text-sm text-gray-500">
          {subtitle}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
