"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const PatientEditPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    bloodGroup: "",
    medicalConditions: "",
    allergies: "",
    medications: "",
    insuranceProvider: "",
    insurancePolicyNumber: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve existing patient data from localStorage
    const data = localStorage.getItem("patientData");
    if (data) {
      setFormData(JSON.parse(data));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save updated data to localStorage (or send to an API in a real application)
    localStorage.setItem("patientData", JSON.stringify(formData));
    router.push("/patient/profile"); // Redirect to profile page after saving
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Edit Patient Profile</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                placeholder="johndoe"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="johndoe@example.com"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="(123) 456-7890"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                placeholder="123 Main St"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                name="state"
                placeholder="State"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                placeholder="12345"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Medical Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                <input
                  type="text"
                  name="bloodGroup"
                  placeholder="A+, B-, etc."
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Medical Conditions</label>
                <input
                  type="text"
                  name="medicalConditions"
                  placeholder="e.g., Diabetes, Hypertension"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.medicalConditions}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
                <input
                  type="text"
                  name="allergies"
                  placeholder="e.g., Penicillin, Nuts"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.allergies}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Medications</label>
                <input
                  type="text"
                  name="medications"
                  placeholder="e.g., Aspirin, Insulin"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.medications}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Insurance Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Provider</label>
                <input
                  type="text"
                  name="insuranceProvider"
                  placeholder="e.g., Blue Cross"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.insuranceProvider}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Policy Number</label>
                <input
                  type="text"
                  name="insurancePolicyNumber"
                  placeholder="e.g., 123456789"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.insurancePolicyNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Name</label>
                <input
                  type="text"
                  name="emergencyContactName"
                  placeholder="Jane Doe"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.emergencyContactName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Phone</label>
                <input
                  type="tel"
                  name="emergencyContactPhone"
                  placeholder="(123) 456-7890"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.emergencyContactPhone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientEditPage;
