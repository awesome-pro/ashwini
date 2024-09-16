"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface DoctorProfileData {
  name: string;
  username: string;
  email: string;
  specialty: string;
  licenseNumber: string;
  yearsOfExperience: number;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export default function DoctorProfile() {
  const [profileData, setProfileData] = useState<DoctorProfileData | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch doctor data from local storage (or replace with API call)
    const data = localStorage.getItem("doctorProfile");
    if (data) {
      setProfileData(JSON.parse(data));
    } else {
      router.push("/doctor/login"); // Redirect if no profile data is found
    }
  }, [router]);

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-gray-700 text-center">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 p-5">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Doctor Profile
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <p className="p-3 border border-gray-300 rounded-md">{profileData.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <p className="p-3 border border-gray-300 rounded-md">{profileData.username}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="p-3 border border-gray-300 rounded-md">{profileData.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Specialty
            </label>
            <p className="p-3 border border-gray-300 rounded-md">{profileData.specialty}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              License Number
            </label>
            <p className="p-3 border border-gray-300 rounded-md">{profileData.licenseNumber}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Years of Experience
            </label>
            <p className="p-3 border border-gray-300 rounded-md">{profileData.yearsOfExperience}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <p className="p-3 border border-gray-300 rounded-md">{profileData.phone}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <p className="p-3 border border-gray-300 rounded-md">{profileData.address}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <p className="p-3 border border-gray-300 rounded-md">{profileData.city}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <p className="p-3 border border-gray-300 rounded-md">{profileData.state}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Zip Code
            </label>
            <p className="p-3 border border-gray-300 rounded-md">{profileData.zipCode}</p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => router.push("/doctor/edit")}
              className="bg-blue-600 text-white font-bold p-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
