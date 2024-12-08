"use client";
import Footer from "@/components/Footer";
import { GlobeDemo } from "@/components/GlobeDemo";
import { Grid } from "@/components/Grid";
import Hero from "@/components/Hero";
import { HeroScrollDemo } from "@/components/HeroScrollDemo";
import { Testimonials } from "@/components/InfiniteMovingCards";
import { WobbleCards } from "@/components/WobbleCard";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";
import Image from "next/image";
import React, { useRef } from "react";
import "./globals.css";
import Accordion from "@/components/Accordion";


export default function Home() {
  

  return (
    <main className="relative bg-primary text-white flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Hero />
        {/* <Grid/> */}
        <GlobeDemo />
        <WobbleCards />
        {/* <HeroScrollDemo/> */}
        <Testimonials />
        <Accordion/>

        <Footer />
      </div>
    </main>
  );
}
