"use client";

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

// Mock data representing patient, doctor, and appointment status
const appointmentData = [
  {
    patientId: 'P001',
    patientName: 'John Doe',
    roomNo: 101,
    doctorId: 'D001',
    doctorName: 'Dr. Alice Johnson',
    status: 'In Progress',
  },
  {
    patientId: 'P002',
    patientName: 'Jane Smith',
    roomNo: 102,
    doctorId: 'D002',
    doctorName: 'Dr. Bob Williams',
    status: 'Completed',
  },
  {
    patientId: 'P003',
    patientName: 'Michael Brown',
    roomNo: 103,
    doctorId: 'D003',
    doctorName: 'Dr. Charlie Davis',
    status: 'Pending',
  },
];

// Helper function to render status icon
const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Completed':
      return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
    case 'In Progress':
      return <FontAwesomeIcon icon={faClock} className="text-blue-500" />;
    case 'Pending':
      return <FontAwesomeIcon icon={faTimesCircle} className="text-yellow-500" />;
    default:
      return null;
  }
};

function Status({ params }: { params: { id: string } }) {
  // Find the appointment using the patientId from the params
  const appointmentDetail = appointmentData.find((appointment) => appointment.patientId === params.id);

  if (!appointmentDetail) {
    return (
      <section className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-r from-blue-200 to-purple-300">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full border border-gray-200">
          <h1 className="text-3xl font-extrabold text-red-600 mb-4">Appointment Not Found</h1>
          <p className="text-gray-700">No appointment found for ID: {params.id}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-r from-blue-200 to-purple-300">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Appointment Details</h1>
        <div className="grid grid-cols-1 gap-6">
          <div className="p-6 bg-gray-50 rounded-lg shadow-md transform transition-transform hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Patient ID</h2>
            <p className="text-xl font-bold text-gray-800">{appointmentDetail.patientId}</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md transform transition-transform hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Patient Name</h2>
            <p className="text-xl font-bold text-gray-800">{appointmentDetail.patientName}</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md transform transition-transform hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Doctor ID</h2>
            <p className="text-xl font-bold text-gray-800">{appointmentDetail.doctorId}</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md transform transition-transform hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Doctor Name</h2>
            <p className="text-xl font-bold text-gray-800">{appointmentDetail.doctorName}</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md transform transition-transform hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Room No.</h2>
            <p className="text-xl font-bold text-gray-800">{appointmentDetail.roomNo}</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md flex items-center space-x-4 transform transition-transform hover:scale-105">
            {getStatusIcon(appointmentDetail.status)}
            <p className="text-xl font-bold text-gray-800">{appointmentDetail.status}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Status;
