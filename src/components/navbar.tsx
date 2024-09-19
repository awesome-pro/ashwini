"use client";

import * as React from "react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isAdminLoggedIn, setAdminLoggedIn] = useState(false);
  const [isDoctorLoggedIn, setDoctorLoggedIn] = useState(false);

  const handleAdminLoginSuccess = () => {
    setAdminLoggedIn(true);
    setDoctorLoggedIn(false); // Ensure only one role is logged in
  };

  const handleDoctorLoginSuccess = () => {
    setDoctorLoggedIn(true);
    setAdminLoggedIn(false); // Ensure only one role is logged in
  };

  return (
    <nav className="sticky top-0 z-50 bg-black text-white w-full shadow-md px-5 py-2">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link className="flex items-center" href="/">
          <span className="text-3xl font-extrabold text-white">Aarogya</span>
        </Link>

        <div className="hidden md:flex gap-5">
          {/* Conditionally render Admin/Doctor Links */}
          {!isAdminLoggedIn && !isDoctorLoggedIn ? (
            <>
              {/* Admin Buttons */}
              <Link href="/admin/login" className="hover:bg-white hover:text-blue-500 transition px-4 py-2 rounded-md">
                Admin Login
              </Link>
              <Link href="/admin/register" className="hover:bg-white hover:text-blue-500 transition px-4 py-2 rounded-md">
                Admin Register
              </Link>

              {/* Doctor Buttons */}
              <Link href="/doctor/login" className="hover:bg-white hover:text-blue-500 transition px-4 py-2 rounded-md">
                Doctor Login
              </Link>
              <Link href="/doctor/register" className="hover:bg-white hover:text-blue-500 transition px-4 py-2 rounded-md">
                Doctor Register
              </Link>
            </>
          ) : isAdminLoggedIn ? (
            // Admin Logged In
            <>
              <Link href="/admin/patients" className="hover:bg-white hover:text-blue-500 transition px-4 py-2 rounded-md">
                Manage Patients
              </Link>
              <Link href="/admin/doctors" className="hover:bg-white hover:text-blue-500 transition px-4 py-2 rounded-md">
                Manage Doctors
              </Link>
              <Link href="/admin/opds" className="hover:bg-white hover:text-blue-500 transition px-4 py-2 rounded-md">
                Manage OPDs
              </Link>
              <Link href="/admin/time" className="hover:bg-white hover:text-blue-500 transition px-4 py-2 rounded-md">
                Time & Duration Control
              </Link>
            </>
          ) : isDoctorLoggedIn ? (
            // Doctor Logged In
            <>
              <Link href="/doctor/profile" className="hover:bg-white hover:text-blue-500 transition px-4 py-2 rounded-md">
                Doctor Profile
              </Link>
              <Link href="/doctor/patients" className="hover:bg-white hover:text-blue-500 transition px-4 py-2 rounded-md">
                Assigned Patients
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
