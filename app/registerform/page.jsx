"use client";

import React, { useState, useEffect } from 'react';
import Exhibit from '../Exhibit';
import './exhibitform.css';

const Page = () => {
  const [selectedStalls, setSelectedStalls] = useState(new Set());
  const [bookedStalls, setBookedStalls] = useState(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization_name: '',
    designation: '',
    contact: '',
    email: '',
    website: ''
  });

  // Fetch booked stalls
  const fetchBookedStalls = async () => {
    try {
      const response = await fetch('/api/stallData');
      const data = await response.json();
      
      if (data.Items) {
        const booked = new Set(
          data.Items
            .filter(stall => stall.bookingStatus)
            .map(stall => `stall${stall.Stall_Number}`)
        );
        setBookedStalls(booked);
      }
    } catch (error) {
      console.error('Error fetching booked stalls:', error);
    }
  };

  // Fetch booked stalls on mount
  useEffect(() => {
    fetchBookedStalls();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit exhibit data
      const exhibitResponse = await fetch('/api/exhibitData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          stall_number: [...selectedStalls].map(stallId => stallId.replace(/[^\d]/g, "")).join(", ")
        }),
      });

      if (!exhibitResponse.ok) {
        throw new Error('Failed to submit exhibit form');
      }

      // Update stall statuses
      const stallUpdatePromises = [...selectedStalls].map(stallId => {
        const stallNumber = parseInt(stallId.replace(/[^\d]/g, ""));
        return fetch('/api/stallData', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            stall_number: stallNumber,
          }),
        });
      });

      const results = await Promise.all(stallUpdatePromises);
      const failedUpdates = results.filter(r => !r.ok);

      if (failedUpdates.length > 0) {
        throw new Error(`Failed to update ${failedUpdates.length} stall(s)`);
      }

      // Refresh booked stalls
      await fetchBookedStalls();

      // Reset form
      setFormData({
        name: '',
        organization_name: '',
        designation: '',
        contact: '',
        email: '',
        website: ''
      });
      setSelectedStalls(new Set());
      
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`Failed to submit form: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle stall selection change in the parent component
  const handleStallSelectionChange = (newSelectedStalls) => {
    // Filter out any booked stalls from selection
    const validStalls = new Set(
      [...newSelectedStalls].filter(stallId => !bookedStalls.has(stallId))
    );
    setSelectedStalls(validStalls);
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

        <form onSubmit={handleSubmit} className="exhibit-form">
          <div className="form-group">
            <input 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="register-forminput" 
              type="text" 
              placeholder="Name" 
              required 
            />
            <input 
              name="organization_name"
              value={formData.organization_name}
              onChange={handleInputChange}
              className="register-forminput" 
              type="text" 
              placeholder="Organization Name" 
              required 
            />
            <input 
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="register-forminput" 
              type="text" 
              placeholder="Designation" 
            />
          </div>
          <div className="form-group">
            <input 
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="register-forminput" 
              type="text" 
              placeholder="Contact Number" 
            />
            <input 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="register-forminput" 
              type="email" 
              placeholder="Official Email ID" 
            />
            <input 
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className="register-forminput" 
              type="text" 
              placeholder="Website/ Social Media Links" 
            />
          </div>

          <Exhibit 
            onStallSelectionChange={handleStallSelectionChange} 
            bookedStalls={bookedStalls}
            selectedStalls={selectedStalls}
          />

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

          <button type="submit" id="registerform-submitbutton" disabled={isSubmitting}>Book</button>
        </form>
      </section>
    </div>
  );
};

export default Page;
