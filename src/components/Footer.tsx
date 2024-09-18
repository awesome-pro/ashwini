"use client";

import * as React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          {/* About Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              We provide advanced solutions for healthcare management, including queuing systems, inventory management, and integration with city-wide modules.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">Home</Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white">Services</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">About</Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400">1234 Health St, Suite 100</p>
            <p className="text-gray-400">Health City, HC 12345</p>
            <p className="text-gray-400">Email: info@aarogya.com</p>
            <p className="text-gray-400">Phone: (123) 456-7890</p>
          </div>

          {/* Social Media Links */}
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaFacebookF size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaLinkedinIn size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-4 text-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Aarogya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
