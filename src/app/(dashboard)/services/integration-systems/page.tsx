"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

const LearnMoreIntegrationSystems = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-5">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800">Integration with City-wide Systems</h1>
        <p className="text-lg text-gray-600">Seamlessly integrate hospital solutions with city-wide healthcare management systems for enhanced coordination and efficiency.</p>
      </header>

      <section className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">City-wide Coordination</h2>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbg2gQSZO5O2W7O1Zlyn3urxv35tFpdLFAVQ&s" // Replace with your image path
              alt="City-wide Coordination"
              width={600}
              height={400}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700 mb-4">
              Our integration solutions facilitate seamless coordination between hospitals and city-wide healthcare networks. By connecting different healthcare providers, we enable a unified approach to patient care, resource allocation, and emergency management.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Unified patient records across the city</li>
              <li>Coordinated response to healthcare emergencies</li>
              <li>Streamlined communication between healthcare providers</li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Enhanced Data Sharing</h2>
            <Image
              src="data:image/jpeg;base64,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" // Replace with your image path
              alt="Enhanced Data Sharing"
              width={600}
              height={400}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700 mb-4">
              With our integration solutions, hospitals can securely share data with city-wide systems. This ensures that critical information, such as patient history, treatment plans, and medical records, is accessible when and where it is needed, improving the quality of care and operational efficiency.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Secure and compliant data exchange</li>
              <li>Access to comprehensive patient information</li>
              <li>Improved decision-making with integrated data</li>
            </ul>
          </div>
        </div>

        <section className="mt-12 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Case Studies & Success Stories</h2>
          <p className="text-gray-700 mb-4">
            Discover how our integration solutions have transformed healthcare coordination and data sharing in various cities. Explore our case studies to see real-world examples of enhanced healthcare management and operational efficiency.
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li><a href="/case-studies/city-a" className="text-blue-500 hover:underline">City A: Improving City-wide Healthcare Coordination</a></li>
            <li><a href="/case-studies/city-b" className="text-blue-500 hover:underline">City B: Enhancing Data Sharing Across Healthcare Providers</a></li>
          </ul>
        </section>
      </section>

      <footer className="mt-12 text-center">
        <Link
          href="/services"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Back to Services
        </Link>
      </footer>
    </div>
  );
};

export default LearnMoreIntegrationSystems;