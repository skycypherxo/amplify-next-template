"use client";
import React from 'react';
import Navbar from '../components/Navbar';

const Landing = () => {
  return (
    <div
      className="h-screen overflow-hidden bg-cover bg-center bg-[url('/image.jpg')] relative"
      
    >
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#182e43] opacity-80"></div> {/* Bluish Overlay */}


      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        {/* Navbar */}
        {/* <div className="absolute top-0 w-full">
          <Navbar />
        </div> */}

        {/* Main Content */}
        <div className="flex flex-col items-center mt-[44vh]">
          {/* Container for Text and Line */}
          <div className="inline-block text-center">
            <h1 className="text-xl md:text-6xl font-semibold">
              MAHA CSR SUMMIT 2025
            </h1>
            <div className="border-t border-white mt-4 mb-4" style={{ width: '95%' }}></div>
          </div>

          <div className="flex justify-start w-full mt-4 px-1">
            <p className="text-lg md:text-xl font-light">
              February 2025 Mumbai, Maharashtra, India
            </p>
            <button className="px-3 py-1 bg-[#182e43] text-white rounded-md font-medium ml-10">
              RSVP TODAY
            </button>
          </div>
        </div>
        {/* Rotated Square */}
      <div
        className="absolute bottom-[-75px] rounded-xl left-1/2 transform -translate-x-[90px]  translate-y-[120px]  rotate-45 bg-white"
        style={{
          width: '200px',
          height: '200px',
          // borderRadius: '8px',
        }}
      ></div>
        



      </div>
    </div>
  );
};

export default Landing;