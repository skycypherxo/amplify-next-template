"use client";
import React from "react";
import AwardNominationForm from "../components/AwardNominationForm";


const Page = () => {
  return (
    <div className="h-full w-full bg-[#174173] max-h-max">
      {/* Hero section */}
      <div className="relative h-screen w-full bg-green-500 bg-cover" style={{ backgroundImage: "url('/awards_main.png')" }}>
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#182e43] opacity-80 z-10"></div>
        {/* Content */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center px-4">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold text-white">Nominations For Awards</h1>
          <div className="border-t border-white mt-4 mb-4 w-3/4 md:w-1/2 mx-auto"></div>
          <h3 className="font-bold text-md md:text-xl lg:text-2xl text-white">Get awarded at MAHA CSR 2025</h3>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-form-blue">
        <AwardNominationForm />
      </div>
    </div>
  );
};

export default Page;
