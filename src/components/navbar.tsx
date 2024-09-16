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
          <span className="text-2xl font-bold text-primary">Aarogya</span>
        </Link>

        <div className="hidden md:flex gap-3">
          {/* Conditionally render Admin/Doctor Links */}
          {!isAdminLoggedIn && !isDoctorLoggedIn ? (
            <>
              {/* Admin Buttons */}
              <Link href="/admin/login" className="text-white">
                Admin Login
              </Link>
              <Link href="/admin/register" className="text-white">
                Admin Register
              </Link>

              {/* Doctor Buttons */}
              <Link href="/doctor/login" className="text-white">
                Doctor Login
              </Link>
              <Link href="/doctor/register" className="text-white">
                Doctor Register
              </Link>
            </>
          ) : isAdminLoggedIn ? (
            // Admin Logged In
            <>
              <Link href="/admin/patients" className="text-white">
                Manage Patients
              </Link>
              <Link href="/admin/doctors" className="text-white">
                Manage Doctors
              </Link>
              <Link href="/admin/opds" className="text-white">
                Manage OPDs
              </Link>
              <Link href="/admin/time" className="text-white">
                Time & Duration Control
              </Link>
            </>
          ) : isDoctorLoggedIn ? (
            // Doctor Logged In
            <>
              <Link href="/doctor/profile" className="text-white">
                Doctor Profile
              </Link>
              <Link href="/doctor/patients" className="text-white">
                Assigned Patients
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
