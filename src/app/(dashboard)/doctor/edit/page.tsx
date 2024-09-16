"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
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

export default function DoctorEditProfile() {
  const [formData, setFormData] = useState<DoctorProfileData>({
    name: "",
    username: "",
    email: "",
    specialty: "",
    licenseNumber: "",
    yearsOfExperience: 0,
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch current profile data from local storage (or API)
    const data = localStorage.getItem("doctorProfile");
    if (data) {
      setFormData(JSON.parse(data));
    } else {
      router.push("/doctor/login"); // Redirect if no profile data is found
    }
  }, [router]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate data here if needed

    // Simulate saving data (replace with API call)
    localStorage.setItem("doctorProfile", JSON.stringify(formData));
    router.push("/doctor/profile"); // Redirect to profile page after saving
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 p-5">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Edit Doctor Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Dr. John Doe"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="doctor@example.com"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Specialty</label>
            <input
              type="text"
              name="specialty"
              placeholder="Cardiology, Neurology, etc."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.specialty}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">License Number</label>
            <input
              type="text"
              name="licenseNumber"
              placeholder="License Number"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
            <input
              type="number"
              name="yearsOfExperience"
              placeholder="Years of Experience"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.yearsOfExperience}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              placeholder="State"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.zipCode}
              onChange={handleInputChange}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold p-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
