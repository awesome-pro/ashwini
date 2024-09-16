import AppointmentForm from '@/components/appointment-form'
import React from 'react'

function Appointment() {
  return (
    <section className='relative min-h-screen w-screen items-center justify-center flex flex-col'>
        <h1 className='text-3xl font-semibold mb-2'>Book Appointment </h1>

        <AppointmentForm />
    </section>
  )
}

export default Appointment