"use client";

import * as React from "react";
import Link from "next/link";

const services = [
  {
    title: "Queuing and Bed Management",
    description: "Optimize OPD queuing models, manage bed availability, and streamline patient admissions with our advanced solutions.",
    image: "https://plus.unsplash.com/premium_photo-1664476553552-84de4520b37c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8UXVldWluZyUyMGFuZCUyMEJlZCUyME1hbmFnZW1lbnQlMjBkb2N0b3J8ZW58MHx8MHx8fDA%3D", // Replace with your image path
    link: "/services/queuing-bed-management"
  },
  {
    title: "Medicine and Consumables Management",
    description: "Efficiently manage the dispensation of medicines and consumables, and track inventory with our hospital-level modules.",
    image: "https://plus.unsplash.com/premium_photo-1661304713898-b6980743aa2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8TWVkaWNpbmUlMjBhbmQlMjBDb25zdW1hYmxlcyUyME1hbmFnZW1lbnR8ZW58MHx8MHx8fDA%3D", // Replace with your image path
    link: "/services/medicine-management"
  },
  {
    title: "Integration with City-wide Systems",
    description: "Seamlessly integrate hospital-based solutions with city-wide modules for comprehensive healthcare management.",
    image: "https://plus.unsplash.com/premium_photo-1661741213298-16d21d70a6f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEludGVncmF0aW9uJTIwd2l0aCUyMENpdHklMjB3aWRlJTIwU3lzdGVtcyUyMGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D", // Replace with your image path
    link: "/services/integration-systems"
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-5">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">Our Technological Solutions</h1>
        <p className="text-lg text-gray-600">Explore our solutions designed to enhance hospital management and integration.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h2 className="text-2xl font-semibold mt-4 mb-2">{service.title}</h2>
            <p className="text-gray-700 mb-4">{service.description}</p>
            <Link
              href={service.link}
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
