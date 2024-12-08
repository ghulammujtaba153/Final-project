"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";

export function DoctorCard({ cardData }) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="relative flex text-white items-center justify-center flex-col group/card transition-transform duration-300 hover:shadow-[var(--box-shadow-1)] bg-[--color-grey-5] dark:border-[--color-grey-4] border-[--color-grey-1] w-[12rem] sm:w-[15rem] h-auto rounded-lg p-4 border">
        
      <CardItem translateZ="100" className="flex justify-center w-full mt-4">
        <img
          src={cardData.userId.profile}
          height={100}  // Reduce the height to half
          width={100}   // Reduce the width to half
          className="h-20 w-20 object-cover rounded-full shadow-md transition-transform duration-300 transform group-hover/card:scale-105"
          alt="thumbnail"
        />
      </CardItem>


        <CardItem
          translateZ="50"
          className="text-lg font-semibold mt-3"
        >
          {cardData.userId.firstName + " " + cardData.userId.lastName}
        </CardItem>

        <CardItem
          as="p"
          translateZ="60"
          className="text-sm max-w-xs text-center mt-2"
        >
          {cardData.specialization}
        </CardItem>

        <div className="flex items-center mt-3">
          <p className="font-medium ">
            Fee (PKR):{" "}
            <span className="text-sm text-[--color-secondary] font-semibold">
              {cardData.fee}
            </span>
          </p>
        </div>

        <div className="flex justify-between items-center mt-5">
          <Link
            href={`/dashboard/doctors/${cardData.userId._id}`}
            className="bg-[--color-primary] hover:bg-[--color-secondary] text-white px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-200"
            passHref
          >
            View now →
          </Link>
        </div>
      </CardBody>
    </CardContainer>
  );
}
