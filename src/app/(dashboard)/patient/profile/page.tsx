"use client";

import React, { useEffect, useState } from "react";

const PatientProfilePage: React.FC = () => {
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    // Retrieve patient data from localStorage (or fetch from an API in a real application)
    const data = localStorage.getItem("patientData");
    if (data) {
      setProfileData(JSON.parse(data));
    } else {
      // Handle case where no data is found
      window.location.href = "/patient/register"; // Redirect to registration page if no profile data
    }
  }, []);

  if (!profileData) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Patient Profile</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><strong>First Name:</strong> {profileData.firstName}</div>
              <div><strong>Last Name:</strong> {profileData.lastName}</div>
              <div><strong>Username:</strong> {profileData.username}</div>
              <div><strong>Email:</strong> {profileData.email}</div>
              <div><strong>Phone:</strong> {profileData.phone}</div>
              <div><strong>Date of Birth:</strong> {profileData.dob}</div>
              <div><strong>Gender:</strong> {profileData.gender}</div>
              <div><strong>Address:</strong> {profileData.address}</div>
              <div><strong>City:</strong> {profileData.city}</div>
              <div><strong>State:</strong> {profileData.state}</div>
              <div><strong>Zip Code:</strong> {profileData.zipCode}</div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Medical Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><strong>Blood Group:</strong> {profileData.bloodGroup}</div>
              <div><strong>Medical Conditions:</strong> {profileData.medicalConditions}</div>
              <div><strong>Allergies:</strong> {profileData.allergies}</div>
              <div><strong>Medications:</strong> {profileData.medications}</div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Insurance Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><strong>Insurance Provider:</strong> {profileData.insuranceProvider}</div>
              <div><strong>Insurance Policy Number:</strong> {profileData.insurancePolicyNumber}</div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><strong>Emergency Contact Name:</strong> {profileData.emergencyContactName}</div>
              <div><strong>Emergency Contact Phone:</strong> {profileData.emergencyContactPhone}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/patient/edit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Edit Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default PatientProfilePage;
