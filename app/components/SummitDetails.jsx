import React from "react";
import {
  FaChalkboardTeacher,
  FaRegHandshake,
  FaUsers,
  FaTrophy,
  FaList,
  FaUtensils,
} from "react-icons/fa";
import Image from "next/image";

const SummitDetails = () => {
  return (
    <div className="relative w-full h-screen bg-[#022948] flex items-center justify-center overflow-hidden">
      {/* Top Left Triangle */}
      <Image 
        src="/triangle.png"
        alt="Top Left Triangle"
        width={200}
        height={200}
        className="absolute top-0 left-0 opacity-20 lg:opacity-100"
      />
      {/* Top Right Triangle */}
      <Image
        src="/triangle.png"
        alt="Top Right Triangle"
        width={200}
        height={200}
        className="absolute top-0 right-0 opacity-20 lg:opacity-100"
      />
      <div className="w-[90%] h-[90%] bg-[#022948] p-8 shadow-md flex flex-col justify-center items-center">
        {/* Title split into two lines */}
        <h3 className="text-4xl sm: mt-24 font-bold text-center text-white mb-8 md:mb-16">
          WHY JOIN MAHA CSR
          <br />
          SUMMIT 2025?
        </h3>
        
        {/* Content arranged in two horizontal rows with icons */}
        <div className="flex flex-col w-full">
          <div className="flex flex-wrap">
            <div className="w-full md:w-[33.33%] flex justify-center items-center flex-col">
              <FaChalkboardTeacher className="flex m-2 md:m-8 text-3xl justify-center items-center text-white" size={48} />
              <p className="text-center text-white">Workshops & Masterclasses</p>
            </div>
            <div className="w-full md:w-[33.33%] flex justify-center items-center flex-col">
              <FaRegHandshake className="flex m-2 md:m-8 text-3xl justify-center items-center text-white" size={48} />
              <p className="text-center text-white">Access to Policy Makers</p>
            </div>
            <div className="w-full md:w-[33.33%] flex justify-center items-center flex-col">
              <FaUsers className="flex m-2 md:m-8 text-3xl justify-center items-center text-white" size={48} />
              <p className="text-center text-white">Networking Opportunities</p>
            </div>
            <div className="w-full md:w-[33.33%] flex justify-center items-center flex-col ">
              <FaTrophy className="flex m-2 md:m-8 text-3xl justify-center items-center text-white" size={48} />
              <p className="text-center text-white">Awards & Recognition</p>
            </div>
            <div className="w-full md:w-[33.33%] flex justify-center items-center flex-col">
              <FaList className="flex m-2 md:m-8 text-3xl justify-center items-center text-white" size={48} />
              <p className="text-center text-white">100+ Exhibitors & Speaker Sessions</p>
            </div>
            <div className="w-full md:w-[33.33%] flex justify-center items-center flex-col">
              <FaUtensils className="flex m-2 md:m-8 text-3xl justify-center items-center text-white" size={48} />
              <p className="text-center text-white">VIP Dinner</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummitDetails;