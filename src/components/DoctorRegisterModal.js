"use client";
import React, { useState } from "react";
import Modal from "@/components/Modal"; // Assuming you have a generic Modal component

const DoctorRegisterModal = ({ isOpen, onClose }) => {
  const [doctorDetails, setDoctorDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setDoctorDetails({ ...doctorDetails, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (doctorDetails.password !== doctorDetails.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Simulate registration process
    localStorage.setItem("isDoctorRegistered", true);
    alert("Doctor Registered Successfully");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-5">
        <h2 className="text-xl font-bold mb-4">Doctor Registration</h2>
        <form onSubmit={handleRegister}>
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
            className="w-full mb-2 p-2 border rounded"
            value={doctorDetails.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full mb-4 p-2 border rounded"
            value={doctorDetails.confirmPassword}
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Register
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default DoctorRegisterModal;
