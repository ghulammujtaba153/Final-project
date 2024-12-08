"use client";

import Image from 'next/image';
import React from "react";
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import TestAppointmentModal from './TestAppointmentModal';

export function TestsCard({ cardData }) {
  return (
    <CardContainer className="inter-var w-[12rem] sm:w-[15rem]">
      <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] text-white bg-grey5 dark:border-white/[0.2] border-black/[0.1] rounded-xl p-4 border cursor-pointer h-[280px]"> {/* Adjusted padding and height */}
        <div className='flex flex-col gap-2 justify-between h-full'>
          <CardItem
            translateZ="50"
            className="text-lg font-bold text-neutral-600 dark:text-white" // Reduced font size slightly
          >
            {cardData.testName}
          </CardItem>
          <img
            src={cardData.picture}
            className="object-cover w-full h-[100px] rounded-md group-hover/card:shadow-xl" // Set a fixed height for the image
            alt="Profile"
          />
          <div className="flex flex-col w-full items-center">
            <p className="font-bold text-sm">Price: <span className="text-white-200">{cardData.price}</span></p> {/* Reduced font size */}
            <TestAppointmentModal appointmentId={cardData._id} fee={cardData.price} />
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}
