"use client";

import React, { useState } from 'react';
import Exhibit from '../Exhibit';
import './exhibitform.css';

const Page = () => {
  const [selectedStalls, setSelectedStalls] = useState(new Set());

  // Handle stall selection change in the parent component
  const handleStallSelectionChange = (newSelectedStalls) => {
    setSelectedStalls(newSelectedStalls);
  };

  return (
    <div className="page-container font-montserrat">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="font-bold">Exhibit at MAHA CSR 2025</h1>
          <p id="stall-quote" className="font-semibold">Have your very own stall at MAHA CSR 2025</p>
        </div>
      </header>

      <section className="form-section">
        <h2 className="font-semibold">Register to Exhibit</h2>

        <div className="exhibit-form">
          <div className="form-group">
            <input className="register-forminput" type="text" placeholder="Name" />
            <input className="register-forminput" type="text" placeholder="Organization Name" />
            <input className="register-forminput" type="text" placeholder="Designation" />
          </div>
          <div className="form-group">
            <input className="register-forminput" type="text" placeholder="Contact Number" />
            <input className="register-forminput" type="email" placeholder="Official Email ID" />
            <input className="register-forminput" type="text" placeholder="Website/ Social Media Links" />
          </div>
        </div>

        {/* Pass the handleStallSelectionChange function to Exhibit */}
        <Exhibit onStallSelectionChange={handleStallSelectionChange} />

        {/* Display selected stalls (if any) */}
        <div className="selected-stalls">
          {selectedStalls.size > 0 ? (
            <div className="mt-8">
              <h3 className="text-lg font-semibold">Selected Stalls:</h3>
              <p className="text-gray-700">
                {/* Slice the 'stall' part and only display the numbers */}
                {([...selectedStalls])
                  .map(stallId => stallId.replace(/[^\d]/g, ""))  // Remove non-digit characters
                  .join(", ")}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 mt-8">No stalls selected.</p>
          )}
        </div>

        {/* Submit Button */}
        <button id="registerform-submitbutton">Book</button>
      </section>
    </div>
  );
};

export default Page;
