"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const SummitSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const carouselItems = [
    { title: "Speaker Sessions" },
    { title: "Workshops" },
    { title: "Panel Discussions" },
    { title: "Exhibitions" },
  ];

  const totalItems = carouselItems.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % (totalItems * 2));
    }, 2000);

    return () => clearInterval(interval);
  }, [totalItems]);

  useEffect(() => {
    if (carouselRef.current) {
      if (activeIndex === totalItems) {
        setTimeout(() => {
          carouselRef.current.style.transition = 'none';
          setActiveIndex(0);
        }, 700); // duration of the animation
      } else {
        carouselRef.current.style.transition = 'transform 0.7s ease-in-out';
      }
    }
  }, [activeIndex, totalItems]);

  return (
    <div className="flex flex-col items-center justify-center bg-white py-16 px-6 md:px-16 lg:px-24 relative">
      {/* Heading Section */}
      <div className="flex flex-col md:flex-row items-start justify-between w-full max-w-[1200px]">
        <div className="flex flex-col text-left md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-black">The Summit</h2>
          <div className="border-t border-black mt-4 mb-4" style={{ width: "50%" }}></div>
          <div className="flex flex-wrap gap-4 mt-2">
            <p className="text-black">Two Days of Empowering Sessions</p>
            <p className="text-black">February 2025</p>
            <p className="text-black">12:00 noon</p>
          </div>

          {/* Arrows under the heading */}
          <div className="flex justify-start mt-4">
            <button onClick={() => setActiveIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems)} className="text-black mx-2">
              <FaArrowLeft size={24} /> {/* Previous button icon */}
            </button>
            <button onClick={() => setActiveIndex((prevIndex) => (prevIndex + 1) % totalItems)} className="text-black mx-2">
              <FaArrowRight size={24} /> {/* Next button icon */}
            </button>
          </div>
        </div>

        {/* Right: Simple Carousel */}
        <div className="relative w-full md:w-1/2 mt-6 md:mt-0">
          <div className="w-[100%] md:w-[75%] h-[10rem] bg-[#022948] p-6 rounded-tl-[100px] rounded-br-none shadow-2xl mx-auto md:ml-auto md:mr-0 overflow-hidden" style={{ marginTop: "-30px" }}>
            <div ref={carouselRef} className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${(activeIndex % totalItems) * 100}%)` }}>
              {carouselItems.concat(carouselItems).map((item, index) => (
                <div key={index} className="w-[50%] flex-shrink-0 flex justify-center items-center">
                  <div className="w-[7rem] h-[7rem] bg-gradient-to-t from-[#4dc6dc] via-[#2d93c9] to-[#1871bc] p-4 rounded-bl-[48px] rounded-tr-md rounded-tl-md rounded-br-md shadow-lg text-center text-white text-xs font-light flex items-center justify-center mx-4">
                    <h3 className="text-xs font-light">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="max-w-3xl text-right mt-10 mb-4 mx-auto px-4">
        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
          The Maha CSR Summit 2025, organized under the visionary leadership of Chief Minister of Maharashtra Hon. Shri.
          Eknath Shinde, aims to bring together key stakeholders in the field of Corporate Social Responsibility (CSR)
          to foster collaboration, share best practices, and drive impactful initiatives. This two-day event will
          feature engaging speaker sessions, interactive workshops, panel discussions, exhibitions, and awards
          ceremonies, all designed to empower organizations to enhance their CSR efforts and contribute to sustainable
          development in Maharashtra.
        </p>
      </div>

      {/* Initiative Section */}
      <div className="absolute bottom-0 left-16 p-2 bg-white mt-4">
        <p className="text-gray-600 text-sm md:text-base font-semibold">An Initiative by</p>
        <p className="text-black font-bold text-lg md:text-xl">#MahaGov</p>
      </div>
    </div>
  );
};

export default SummitSection;
