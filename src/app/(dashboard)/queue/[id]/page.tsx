"use cl"

import React from 'react'

function Status(
    {params}: {
        params: {
            id: string
        }
    }
) {
  return (
    <section>
        <h1>Status</h1>

        <p>Appointment ID: {params.id}</p>
    </section>
  )
}

export default Status