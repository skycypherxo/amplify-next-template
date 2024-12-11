"use client";

import ContactCard from "./ContactCard";
// import Navbar from "./Navbar";
import SocialCard from "./SocialCard";
import AddressCard from "./AddressCard";
import React, { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    document.title = "Contact Us";
  }, []);
  return (
    <div className="xl:h-screen sm:h-auto w-full bg-gradient-to-b from-[#1c4474] to-[#54ccdc] text-white flex-col justify-items-center">
      {/* <Navbar /> */}
      <div className="w-4/5 flex-col justify-items-center pt-8 pb-8">
        <p className="font-semibold lg:text-6xl md:text-5xl sm:text-4xl text-2xl border-b-4 w-3/5 text-center pb-4 mt-16 mb-10">
          Contact Us
        </p>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-y-5 lg:gap-x-16 justify-center">
          <ContactCard
            queryName={"Exibit"}
            name={"Shivam Tripathi"}
            email={"shivamtripathi@gmail.com"}
            tel1={1234567890}
            tel2={1234567890}
          />
          <ContactCard
            queryName={"Exibit"}
            name={"Shivam Tripathi"}
            email={"shivamtripathi@gmail.com"}
            tel1={1234567890}
            tel2={1234567890}
          />
          <ContactCard
            queryName={"Exibit"}
            name={"Shivam Tripathi"}
            email={"shivamtripathi@gmail.com"}
            tel1={1234567890}
            tel2={1234567890}
          />
          <ContactCard
            queryName={"Exibit"}
            name={"Shivam Tripathi"}
            email={"shivamtripathi@gmail.com"}
            tel1={1234567890}
            tel2={1234567890}
          />
        </div>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-y-5 md:gap-x-16 justify-center mt-8">
          <SocialCard
            title={"Follow Us"}
            insta={"shivamtripathi"}
            twitter={"shivamtripathi"}
            youtube={"shivamtripathi"}
          />
          <AddressCard
            add={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis ut debitis voluptatum asperiores  laborum aliquam doloremque."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
