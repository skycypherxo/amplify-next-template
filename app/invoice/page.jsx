'use client'

import { useState } from 'react'
import jsPDF from 'jspdf'
import { format } from 'date-fns'

const InvoicePage = () => {
  const [formData, setFormData] = useState({
    orgName: '',
    contactPerson: '',
    designation: '',
    contactNo: '',
    email: '',
    website: '',
    stallNumber: '',
    amountPaid: '',
    paymentStatus: 'Pending',
    paymentTime: '',
    transactionId: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add content to PDF
    doc.setFontSize(20);
    doc.text('INVOICE', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Date: ${format(new Date(), 'yyyy-MM-dd')}`, 20, 40);
    doc.text(`Invoice #: INV-2024-001`, 20, 50);
    
    // Organization Details
    doc.setFontSize(14);
    doc.text('Organization Details:', 20, 70);
    doc.setFontSize(12);
    doc.text(`Organization: ${formData.orgName}`, 20, 80);
    doc.text(`Contact Person: ${formData.contactPerson}`, 20, 90);
    doc.text(`Designation: ${formData.designation}`, 20, 100);
    doc.text(`Contact No: ${formData.contactNo}`, 20, 110);
    doc.text(`Email: ${formData.email}`, 20, 120);
    doc.text(`Website: ${formData.website}`, 20, 130);

    // Payment Details
    doc.setFontSize(14);
    doc.text('Payment Details:', 20, 150);
    doc.setFontSize(12);
    doc.text(`Stall Number: ${formData.stallNumber}`, 20, 160);
    doc.text(`Amount Paid: ${formData.amountPaid}`, 20, 170);
    doc.text(`Payment Status: ${formData.paymentStatus}`, 20, 180);
    doc.text(`Payment Time: ${formData.paymentTime}`, 20, 190);
    doc.text(`Transaction ID: ${formData.transactionId}`, 20, 200);

    // Save PDF
    doc.save('invoice.pdf');
  };

  const handleEmailSend = async () => {
    try {
      const response = await fetch('/api/send-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Invoice sent successfully to email!');
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      alert('Failed to send email: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Form fields */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Organization Details</h2>
            <div className="space-y-2">
              <div className="flex">
                <span className="text-gray-600 w-32">Organization:</span>
                <input 
                  type="text"
                  name="orgName"
                  value={formData.orgName}
                  onChange={handleInputChange}
                  className="flex-1 border rounded px-2 py-1"
                  placeholder="Organization name"
                />
              </div>
              {/* Add other form fields similarly */}
            </div>
          </div>
        </div>

        {/* Download and Email Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button 
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors flex items-center gap-2"
            onClick={handleEmailSend}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Send to Email
          </button>
          
          <button 
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
            onClick={generatePDF}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;