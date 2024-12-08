"use client";

import Filters from '@/components/Filters';
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Doctor = () => {
  return (
    <div className="bg-black-100 py-[40px] text-white flex items-center flex-col">
        <div className="w-full mx-auto mt-[100px] mr-10 flex items-center justify-around">
            <Filters/>
            <Input id="text" placeholder="search" type="text"/>
        </div>
        <div>
            {/* <ThreeDCardDemo/> */}
        </div>
       

    </div>
  );
};

export default Doctor;
