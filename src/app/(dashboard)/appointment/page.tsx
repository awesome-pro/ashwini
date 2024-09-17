import AppointmentForm from '@/components/appointment-form';
import React from 'react';

function Appointment() {
  return (
    <section className="relative min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-12">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-blue-200 opacity-10 z-0" />

      <h1 className="text-4xl font-bold text-blue-900 mb-6 z-10">
        Book an Appointment
      </h1>

      {/* Card Wrapper to Center Form */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden z-10">
        <AppointmentForm />
      </div>

      {/* Optional CTA or Info */}
      <div className="mt-8 text-center z-10">
        <p className="text-sm text-gray-600">
          Need help? Contact us at{' '}
          <a href="mailto:support@hospital.com" className="text-blue-600 underline">
            support@hospital.com
          </a>
        </p>
      </div>
    </section>
  );
}

export default Appointment;
