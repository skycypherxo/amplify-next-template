"use client";

import React, { useState, useEffect } from "react";
import Exhibit from "../Exhibit";
import "./exhibitform.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const [selectedStalls, setSelectedStalls] = useState(new Set());
  const [bookedStalls, setBookedStalls] = useState(new Set());
  const [reservedStalls, setReservedStalls] = useState(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    organization_name: "",
    designation: "",
    contact: "",
    email: "",
    website: "",
  });

  // Fetch stall data (booked and reserved stalls)
  const fetchStallData = async () => {
    try {
      const [bookedResponse, reservedResponse] = await Promise.all([
        fetch("/api/stallData"),
        fetch("/api/reservedStall"), // Fetch reserved stalls
      ]);

      if (!bookedResponse.ok || !reservedResponse.ok) {
        throw new Error("Failed to fetch stall data");
      }

      const bookedData = await bookedResponse.json();
      const reservedData = await reservedResponse.json();

      // Set booked stalls
      setBookedStalls(new Set(bookedData.map((stall) => `stall${stall.Stall_Number}`)));

      // Set reserved stalls
      setReservedStalls(new Set(reservedData.map((stallId) => `stall${stallId}`)));
    } catch (error) {
      console.error("Error fetching stall data:", error);
    }
  };

  useEffect(() => {
    fetchStallData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      // Step 1: Refresh reserved stall data to ensure no conflicts
      await fetchStallData();
      console.log("First call : ", reservedStalls);
      const invalidStalls = [...selectedStalls].filter((stallId) =>
        reservedStalls.has(stallId)
      );
  
      if (invalidStalls.length > 0) {
        throw new Error(
          `The following stalls are already reserved: ${invalidStalls
            .map((stallId) => stallId.replace(/[^\d]/g, ""))
            .join(", ")}`
        );
      }
  
      // Step 2: Reserve the selected stalls
      const stallNumbers = [...selectedStalls].map((stallId) => 
        parseInt(stallId.replace(/[^\d]/g, ""), 10)
      );
      
      const response = await fetch("/api/reservedStall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          stall_ids: stallNumbers, 
          duration: 30000 
        }), // Reserve for 30 seconds
      });
      
      const results = await response.json();
      
      if (!response.ok) {
        throw new Error(`Failed to reserve ${stallNumbers.length} stall(s)`);
      }
  
      // Fetch and log reserved stalls after successful reservation
      await fetchStallData();
      console.log("Reserved Stalls:", Array.from(reservedStalls));
  
      // Step 3: Process payment using the /api/initializePayment route
      const paymentResponse = await fetch("/api/initializePayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stall_id: [...selectedStalls][0].replace(/[^\d]/g, ""),
          formData: formData,
        }),
      });
  
      if (!paymentResponse.ok) {
        throw new Error("Payment failed");
      }
  
      // Step 4: Confirm booking using /api/exhibitData route
      const bookingResponse = await fetch("/api/exhibitData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          stall_number: [...selectedStalls].map((stallId) => stallId.replace(/[^\d]/g, "")),
        }),
      });
  
      if (!bookingResponse.ok) {
        throw new Error("Failed to confirm booking");
      }
  
      // Step 5: Update stall status in the database
      const updateStatusPromises = [...selectedStalls].map((stallId) => {
        const stallNumber = parseInt(stallId.replace(/[^\d]/g, ""), 10);
  
        return fetch("/api/stallData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stall_id: stallNumber, booking_status: true }),
        });
      });
  
      const statusResults = await Promise.all(updateStatusPromises);
      const failedUpdates = statusResults.filter((r) => !r.ok);
      if (failedUpdates.length > 0) {
        throw new Error(`Failed to update status for ${failedUpdates.length} stall(s)`);
      }
  
      

      // Fetch updated stall data after the booking is confirmed
      await fetchStallData();
  
      // Reset form data and selected stalls
      setFormData({
        name: "",
        organization_name: "",
        designation: "",
        contact: "",
        email: "",
        website: "",
      });
      setSelectedStalls(new Set());
  
      toast("Form submitted, payment successful, booking confirmed, and stall data fetched!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast(`Failed to submit form: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  // Handle stall selection
  const handleStallSelectionChange = (newSelectedStalls) => {
    const validStalls = new Set(
      [...newSelectedStalls].filter(
        (stallId) => !bookedStalls.has(stallId) && !reservedStalls.has(stallId)
      )
    );
    setSelectedStalls(validStalls);
  };

  return (
    <div className="page-container font-montserrat">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="font-bold text-4xl md:text-6xl">Exhibit at MAHA CSR 2025</h1>
          <p id="stall-quote" className="font-semibold">Have your very own stall at MAHA CSR 2025</p>
        </div>
      </header>

      <section className="form-section">
        <h2 className="font-semibold mb-2">Register to Exhibit</h2>
        <div className="border-t-2 border-black mt-2 mb-8 mx-[300px]"></div>
        <form onSubmit={handleSubmit} className="exhibit-form">
          <div className="form-inputcontainer">
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="register-forminput"
                  type="text"
                  placeholder="Name"
                  required
                />
                <label htmlFor="organization_name" className="form-label">Organization Name</label>
                <input
                  id="organization_name"
                  name="organization_name"
                  value={formData.organization_name}
                  onChange={handleInputChange}
                  className="register-forminput"
                  type="text"
                  placeholder="Organization Name"
                  required
                />
                <label htmlFor="designation" className="form-label">Designation</label>
                <input
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="register-forminput"
                  type="text"
                  placeholder="Designation"
                />
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label htmlFor="contact" className="form-label">Contact Number</label>
                <input
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="register-forminput"
                  type="tel"
                  placeholder="10 digit phone number"
                  pattern="[0-9]{10}"
                />
                <label htmlFor="email" className="form-label">Official Email ID</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="register-forminput"
                  type="email"
                  placeholder="eg. example@gmail.com"
                />
                <label htmlFor="website" className="form-label">Website/ Social Media Links</label>
                <input
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="register-forminput"
                  type="url"
                  placeholder="eg. https://www.google.co.in/ "
                />
              </div>
            </div>
          </div>

          <Exhibit
            onStallSelectionChange={handleStallSelectionChange}
            bookedStalls={bookedStalls}
            reservedStalls={reservedStalls}
            selectedStalls={selectedStalls}
          />

          <div className="selected-stalls">
            {selectedStalls.size > 0 ? (
              <div className="mt-8">
                <h3 className="text-lg font-semibold">Selected Stalls:</h3>
                <p className="text-[#151515] text-lg">
                  {[...selectedStalls]
                    .map((stallId) => stallId.replace(/[^\d]/g, ""))
                    .join(", ")}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 mt-8">No stalls selected.</p>
            )}
          </div>

          <button type="submit" id="registerform-submitbutton" disabled={isSubmitting}>
            {isSubmitting ? "Booking..." : "Book"}
          </button>
          <ToastContainer/>
        </form>
      </section>
    </div>
  );
};

export default Page;
