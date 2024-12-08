"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function Testimonials() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased  dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden" id="Testimonials">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}


const testimonials = [
  {
    quote:
      "The doctors and staff at this hospital are incredibly attentive and supportive. They went above and beyond to ensure my recovery was as smooth as possible.",
    name: "Ali Raza",
    title: "Recovered Patient",
  },
  {
    quote:
      "I was nervous about my surgery, but the medical team made me feel at ease. They explained every step clearly, and I felt confident I was in good hands.",
    name: "Asim Javed",
    title: "Surgery Patient",
  },
  {
    quote:
      "From the moment I walked in, I felt cared for. The nurses were kind and professional, and the facilities were top-notch.",
    name: "Iqbal Khan",
    title: "Outpatient Care",
  },
  {
    quote:
      "After my accident, the rehabilitation program here helped me regain my strength and confidence. I'm so thankful for the dedicated staff.",
    name: "Maria Ali",
    title: "Physical Therapy Patient",
  },
  {
    quote:
      "I’ve been coming to this hospital for regular check-ups, and I’m always impressed by the efficiency and care provided.",
    name: "Farhan Khan",
    title: "Regular Check-Up Patient",
  },
];
