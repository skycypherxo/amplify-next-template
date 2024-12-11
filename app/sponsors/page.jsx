"use client";
import Image from "next/image";
import React, { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    document.title = "Sponsors";
  }, []);

  return (
    <>
      <div className="absolute xl:top-[0%] xl:left-[0%]">
        <Image alt={'left triangle'} src={'/left-trim.svg'} width={300} height={300} className="xl:w-[300px] lg:w-[250px] md:w-[200px] w-[100px] opacity-70 z-0"/>
      </div>
      <div className="absolute top-[0%] right-[0%]">
      <Image alt={'right triangle'} src={'/right-trim.svg'} width={300} height={300} className="xl:w-[300px] lg:w-[250px] md:w-[200px] w-[100px] opacity-70 z-0"/>
      </div>
      <div className="min-h-screen h-auto bg-[#124371] text-white flex items-center justify-center py-8">
        <div className="w-4/5 h-6/7 flex-col justify-center">
          <div className="relative flex justify-center">
            <p className=" font-bold xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-2xl z-10 border-b-4 xl:pb-2 md:pb-1 mb-4 px-12 text-center mt-28">
              SPONSORS
            </p>
            <p className=" absolute font-extrabold xl:text-[130px] lg:text-[80px] md:text-[60px] text-[40px] z-0 opacity-10 xl:top-[-80%] lg:top-[-50%] md:top-[-40 %] top-[-25%] tracking-widest mt-36 ">
            SPONSORS
          </p>
          </div>

          <div className="lg:w-3/4 md:4/5 mx-auto font-semibold xl:text-xl md:text-lg sm:text-base">
            <ul className="list-disc pl-5">
              <li>
                <p className="text-justify">
                  The Maha CSR Event highlights the critical role of sponsors in
                  enabling the event's success and amplifying its impact. This
                  section acknowledges the generous contributions of corporate
                  leaders, philanthropic organizations, and visionary sponsors
                  who share the event's commitment to driving meaningful change.
                  Through their support, sponsors not only provide vital
                  resources but also demonstrate their dedication to fostering
                  sustainable development and social responsibility.
                </p>
              </li>
              <li>
                <p className="mt-6 text-justify">
                  The section outlines the benefits of sponsorship, showcasing
                  how it serves as a powerful platform for sponsors to align
                  their brand with impactful initiatives, gain visibility among
                  industry leaders, and build meaningful connections with
                  change-makers. It also offers various sponsorship tiers
                  tailored to diverse objectives, ensuring every sponsor finds
                  an opportunity to contribute and engage meaningfully. By
                  celebrating the role of sponsors, this section underscores the
                  importance of shared responsibility in creating a more
                  equitable and sustainable future.
                </p>
              </li>
            </ul>
            <div className="flex justify-center mt-6">
              <button className="bg-[#dcdcdc] text-black px-10 py-4 font-bold mt-2">
                CLICK HERE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
