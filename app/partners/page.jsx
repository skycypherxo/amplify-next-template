"use client";
import React from "react";
import Image from 'next/image'
import { RxDotFilled } from "react-icons/rx";
import { useState,useEffect } from "react";

const Page = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetch("./partners.json") // Assuming it's in the public folder
      .then((response) => response.json())
      .then((data) => setPartners(data))
      .catch((error) => console.error("Error fetching partner data:", error));
  }, []);
  return (
    <div className="w-full  h-full lg:h-full overflow-hidden min-h-screen bg-white space-y-6 text-black flex relative mx-auto flex-col items-center">
      <div className="absolute opacity-70 top-0 left-0 z-0 ">
        <Image
          className="lg:-translate-x-12 lg:-translate-y-16"
          width={600}
          height={600}
          alt="triangle"
          src="/tri_left.png"
          sizes="(max-width: 768px) 300px, (max-width: 1024px) 450px, 600px"
        />
      </div>
      <div className="absolute opacity-70  -translate-y-8 lg:-translate-y-8 top-0 right-0 z-0">
        <Image
          width={600}
          height={600}
          alt="triangle"
          src="/tri_right.png"
          sizes="(max-width: 768px) 300px, (max-width: 1024px) 450px, 600px"
        />
      </div>



      <div className="relative z-10 flex items-center justify-center flex-col">
        <div className="z-2 lg:w-7/12 w-full mt-2 space-y-3 px-4 lg:px-0 mb-10 lg:mb-0">
          {/* <div className="flex justify-center items-center">
            <div className="text-page-blue opacity-10 uppercase lg:text-8xl text-5xl blur-[2px] font-extrabold tracking-[.20em]">
              Partners
            </div>
            <div className="absolute flex flex-col uppercase text-5xl tracking-[.10em] font-bold text-page-blue lg:justify-end top-10">
              <h1>Partners</h1>
              <div className="bg-page-blue translate-y-2 min-w-2 min-h-1 w-10/12"></div>
            </div>
          </div> */}
          <div className="relative flex justify-center">
            <p className="font-bold text-page-blue xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-2xl z-10 border-b-4 border-page-blue xl:pb-2 md:pb-1 mb-4 px-12 text-center mt-20">
              PARTNERS
            </p>
            <p className="absolute text-page-blue  font-extrabold xl:text-[130px] lg:text-[80px] md:text-[60px] text-[40px] z-0 opacity-10 xl:top-[-80%] lg:top-[-50%] md:top-[-40 %] top-[-25%] tracking-widest mt-20 ">
            PARTNERS
          </p>
          </div>
          <div className="flex flex-col text-sm">
            <div className="flex flex-row">
              <span className="mt-1">
                <RxDotFilled />
              </span>
              <p className="text-justify">
                The Maha CSR Event showcases the invaluable contributions of
                organizations and individuals who have joined hands to drive the
                event's vision of impactful change. This section highlights the
                diverse range of partnerships that make the event possible, from
                corporate entities and non-governmental organizations to
                government bodies and social enterprises. Each partner plays a
                pivotal role in amplifying the reach and effectiveness of the
                event, bringing expertise, resources, and innovative approaches to
                the table.
              </p>
            </div>
            <div className="flex flex-row mt-2">
              <span className="mt-1">
                <RxDotFilled />
              </span>
              <p className="text-justify">
                By spotlighting these collaborations, the section emphasizes the
                importance of collective effort in addressing pressing social and
                environmental challenges. It also serves as a testament to the
                power of partnerships in fostering sustainable development and
                creating long-term value for communities. Visitors can explore the
                contributions of each partner, gaining insights into their unique
                roles and shared commitment to driving meaningful impact.
                Together, these partnerships underscore the event's mission to
                inspire, connect, and transform through the spirit of
                collaboration.
              </p>
            </div>
          </div>
          
        </div>
        <div>

        </div>
        <div className="mb-10 mt-6 lg:mb-0 flex justify-center items-center flex-col w-[80%]">
        {partners.map((partner) => (
        <img key={partner.id} src={partner.src} alt={partner.alt} className="scale-x-75 scale-y-75"/>
      ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
