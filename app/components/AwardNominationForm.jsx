import React, { useState } from "react";
import "./awards.css"
const AwardNominationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    contactNumber: "",
    email: "",
    organizationName: "",
    websiteLink: "",
    awardsCategory: "",
    projectDetails: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.designation.trim()) tempErrors.designation = "Designation is required";
    if (!formData.contactNumber.trim()) {
      tempErrors.contactNumber = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      tempErrors.contactNumber = "Enter a valid 10-digit contact number";
    }
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Enter a valid email";
    }
    if (!formData.organizationName.trim()) tempErrors.organizationName = "Organization name is required";
    if (!formData.websiteLink.trim()) tempErrors.websiteLink = "Website link is required";
    if (!formData.awardsCategory.trim()) tempErrors.awardsCategory = "Awards category is required";
    if (!formData.projectDetails.trim()) tempErrors.projectDetails = "Project details are required";
    if (!formData.reason.trim()) tempErrors.reason = "Please provide a reason";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
        const response = await fetch('/api/awardsData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email_id: formData.email,
                name: formData.name,
                organization_name: formData.organizationName,
                designation: formData.designation,
                contact: formData.contactNumber,
                social_link: formData.websiteLink,
                award_category: formData.awardsCategory,
                project_details: formData.projectDetails,
                reason: formData.reason
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to submit data');
        }

        alert('Form submitted successfully!');
        
    } catch (error) {
        console.error('Error submitting data:', error);
        alert(error.message || 'Failed to submit form');
    }
};
  

  return (
    <div className=" mx-auto mt-14 p-6 w-9/12 lg:w-7/12">
      
      <h1 className=" text-center text-white text-5xl font-bold">Nominate Yourself !</h1>
      <div
        className=" border-t-2 border-white mt-4 mb-4 "
        // style={{ width: "87%" }}
      ></div>
      <form onSubmit={handleSubmit} className=" mt-[4rem] flex flex-col lg:grid lg:grid-cols-2 gap-6   gap-x-20">
        {/* Row 1 */}
        <div>
          <label className="block  form-label text-sm  text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full  form-input mt-1 p-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm form-label font-medium text-gray-700">Designation</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className={`w-full form-input mt-1 p-2 border ${errors.designation ? "border-red-500" : "border-gray-300"} rounded-md`}
          />
          {errors.designation && <p className="text-red-500 text-sm">{errors.designation}</p>}
        </div>
        {/* Row 2 */}
        <div>
          <label className="block text-sm form-label font-medium text-gray-700">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className={`w-full form-input mt-1 p-2 border ${errors.contactNumber ? "border-red-500" : "border-gray-300"} rounded-md`}
          />
          {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
        </div>
        <div>
          <label className="block text-sm form-label font-medium text-gray-700">Email ID</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full form-input mt-1 p-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        {/* Row 3 */}
        <div>
          <label className="block text-sm form-label font-medium text-gray-700">Organization Name</label>
          <input
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            className={`w-full form-input mt-1 p-2 border ${errors.organizationName ? "border-red-500" : "border-gray-300"} rounded-md`}
          />
          {errors.organizationName && <p className="text-red-500 text-sm">{errors.organizationName}</p>}
        </div>
        <div>
          <label className="block form-label text-sm font-medium text-gray-700">Website/ Social Media Link</label>
          <input
            type="url"
            name="websiteLink"
            value={formData.websiteLink}
            onChange={handleChange}
            className={`w-full form-input mt-1 p-2 border ${errors.websiteLink ? "border-red-500" : "border-gray-300"} rounded-md`}
          />
          {errors.websiteLink && <p className="text-red-500 text-sm">{errors.websiteLink}</p>}
        </div>
        {/* Row 4 */}
        <div>
          <label className="block form-label text-sm font-medium text-gray-700">Awards Category</label>
          <input
            type="text"
            name="awardsCategory"
            value={formData.awardsCategory}
            onChange={handleChange}
            className={`w-full form-input mt-1 p-2 border ${errors.awardsCategory ? "border-red-500" : "border-gray-300"} rounded-md`}
          />
          {errors.awardsCategory && <p className="text-red-500 text-sm">{errors.awardsCategory}</p>}
        </div>
        <div>
          <label className="block form-label text-sm font-medium text-gray-700">Project Details</label>
          <input
            type="text"
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleChange}
            className={`w-full form-input mt-1 p-2 border ${errors.projectDetails ? "border-red-500" : "border-gray-300"} rounded-md`}
          />
          {errors.projectDetails && <p className="text-red-500 text-sm">{errors.projectDetails}</p>}
        </div>
        {/* Textarea */}
        <div className="col-span-2">
          <label className="block  form-label text-sm font-medium text-gray-700">Why do you think you deserve this award?</label>
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className={`w-full form-input mt-1 p-2 border ${errors.reason ? "border-red-500" : "border-gray-300"} rounded-md`}
          />
          {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
        </div>
        {/* Submit Button */}
        <div className="col-span-2 w-full flex justify-center">
          <button
            type="submit"
            className="px-4 form-input text-xl  py-2 bg-white lg:w-[30%]  text-form-blue font-bold rounded-md hover:bg-blue-600 hover:text-white transition"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default AwardNominationForm;
