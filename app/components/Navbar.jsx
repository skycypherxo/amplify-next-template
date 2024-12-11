"use client";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Hide navbar on scroll down
        setIsVisible(false);
      } else {
        // Show navbar on scroll up
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return ( 
    <header
      className={`${
        isVisible ? "top-0" : "-top-20"
      } transition-all duration-300 z-50 fixed w-full flex justify-between items-center px-6 py-6 ${
        isOpen ? "bg-[#1c4e88f3]" : "bg-[#0d2a3ebe]"
      }`}
    >
      <div className="font-extrabold text-lg text-white">MAHA CSR SUMMIT 2025</div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="absolute top-4 right-2">
          {isOpen ? <FaTimes size={24} className="text-white"/> : <FaBars size={24}  className="text-white"/>}
        </button>
      </div>
      <nav
        className={`md:flex md:items-center ${
          isOpen ? "block" : "hidden"
        } w-full md:w-auto`}
      >
        <ul className="flex flex-col md:flex-row md:space-x-8 list-none text-base px-4 py-1 text-white">
          <Link href="/"><li>Home</li></Link>
          <Link href="/panelists"><li>Speakers/Panelists</li></Link>
          <Link href="/exhibit"><li>Exhibits</li></Link>
          <Link href="/awards"><li>Awards</li></Link>
          <Link href="/partners"><li>Partners</li></Link>
          <Link href="/sponsors"><li>Sponsorships</li></Link>
          <li>Media</li>
          <Link href="/contactus"><li>Contact Us</li></Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
