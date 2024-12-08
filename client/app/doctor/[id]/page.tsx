"use client";

import DoctorDetails from '@/components/DoctorDetails';
import { usePathname } from 'next/navigation';
import React from 'react';

const DoctorDetail = () => {
  const pathname = usePathname();

  // Extract the `id` from the pathname
  const id = pathname?.split("/").pop();

  if (!id) {
    return <div>Loading...</div>; // Or some other loading state
  }

  return (
    <div className="bg-black-100 py-[40px] text-white flex items-center flex-col">
      <DoctorDetails/>
    </div>
  );
};

export default DoctorDetail;
