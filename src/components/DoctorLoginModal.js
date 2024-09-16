"use client";
import React, { useState } from "react";
import Modal from "@/components/Modal"; // Assuming you have a generic Modal component
import { useRouter } from "next/navigation";

const DoctorLoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [doctorDetails, setDoctorDetails] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setDoctorDetails({ ...doctorDetails, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy authentication check
    const isDoctorRegistered = localStorage.getItem("isDoctorRegistered");
    if (isDoctorRegistered && doctorDetails.username && doctorDetails.password) {
      localStorage.setItem("isDoctorLoggedIn", true);
      onLoginSuccess();
      onClose();
      router.push("/doctor/profile"); // Redirect to doctor's profile after login
    } else {
      setError("Invalid credentials or doctor not registered");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-5">
        <h2 className="text-xl font-bold mb-4">Doctor Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full mb-2 p-2 border rounded"
            value={doctorDetails.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded"
            value={doctorDetails.password}
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Login
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default DoctorLoginModal;
