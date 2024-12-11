// JSX File
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
    website: '',
  });

  const fetchBookedStalls = async () => {
    try {
      const response = await fetch('/api/stallData');
      if (!response.ok) throw new Error('Failed to fetch booked stalls');
      const data = await response.json();
      const booked = new Set(
        data.map(stall => `stall${stall.Stall_Number}`)
      );
      setBookedStalls(booked);
    } catch (error) {
      console.error('Error fetching booked stalls:', error);
    }
  };

  useEffect(() => {
    fetchBookedStalls();
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
      const response = await fetch('/api/exhibitData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          stall_ids: [...selectedStalls].map((stallId) => stallId.replace(/[^\d]/g, '')),
        }),
      });

      if (!response.ok) throw new Error('Failed to submit exhibit form');

      const stallPromises = [...selectedStalls].map((stallId) => {
        const stallNumber = parseInt(stallId.replace(/[^\d]/g, ''), 10);
        return fetch('/api/stallData', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stall_id: stallNumber }), 
        });
      });

      const results = await Promise.all(stallPromises);
      const failedUpdates = results.filter((r) => !r.ok);
      if (failedUpdates.length > 0) {
        throw new Error(`Failed to update ${failedUpdates.length} stall(s)`);
      }

      await fetchBookedStalls();

      setFormData({
        name: '',
        organization_name: '',
        designation: '',
        contact: '',
        email: '',
        website: '',
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

  const handleStallSelectionChange = (newSelectedStalls) => {
    const validStalls = new Set(
      [...newSelectedStalls].filter((stallId) => !bookedStalls.has(stallId))
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
        <h2 className="font-semibold mb-2">Register to Exhibit</h2>
        <div
        className=" border-t-2 border-black mt-2 mb-8 mx-[300px]"
        // style={{ width: "87%" }}
      ></div>
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
                type="text"
                placeholder="Contact Number"
              />
              <label htmlFor="contact" className="form-label">Official Email ID</label>
              <input 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="register-forminput"
                type="email"
                placeholder="Official Email ID"
              />
              <label htmlFor="contact" className="form-label">Website/ Social Media Links</label>
              <input 
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="register-forminput"
                type="text"
                placeholder="Website/ Social Media Links"
              />
            </div>
          </div>
          </div>
          <Exhibit
            onStallSelectionChange={handleStallSelectionChange}
            bookedStalls={bookedStalls}
            selectedStalls={selectedStalls}
          />

          <div className="selected-stalls">
            {selectedStalls.size > 0 ? (
              <div className="mt-8">
                <h3 className="text-lg font-semibold">Selected Stalls:</h3>
                <p className="text-[#151515] text-lg">
                  {[...selectedStalls]
                    .map((stallId) => stallId.replace(/[^\d]/g, ''))
                    .join(', ')}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 mt-8">No stalls selected.</p>
            )}
          </div>

          <button type="submit" id="registerform-submitbutton" disabled={isSubmitting}>
            {isSubmitting ? 'Booking...' : 'Book'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Page;