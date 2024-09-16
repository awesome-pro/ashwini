"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

const DoctorLoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Dummy login check
    if (username && password) {
      localStorage.setItem("isDoctorLoggedIn", "true");
      window.location.href = "/"; // Redirect to home page or doctor profile
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Doctor Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold p-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-4">
          Forgot your password?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Reset here
          </a>
        </p>
      </div>
    </div>
  );
};

export default DoctorLoginPage;
