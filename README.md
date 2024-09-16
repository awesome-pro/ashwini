# Ashwini - Revolutionizing OPD Queue Management with AI

<img src="/public/opd.png" width="600px">

## Important Links
1. [Documentation & Low Level Design](https://app.eraser.io/workspace/MHpqxq6BCLBfAfOeUnav?origin=share)
2. [Demo Video](https://www.loom.com/share/5b602d97a29546cda7d3aa77d31d0f5c?sid=163f90ff-da45-4ea4-b8ed-d6f087983f55)
3. [Postman Collections](https://www.postman.com/abhinandan-verma/abhinandan/collection/tqn8zfl/aarogya?action=share&creator=31971900)
4. Hosting is coming soon :)

## Project Overview

**Ashwini** is an AI-driven OPD (Outpatient Department) queue management system designed to streamline appointment scheduling in hospitals. By automating the queue generation process and leveraging AI to assign patients to doctors based on real-time availability, Ashwini minimizes patient wait times and enhances the overall hospital experience. The system utilizes a modern tech stack, including **Next.js**, **Node.js**, **Redis**, **BullMQ**, **Twilio**, and Python-based AI models.

### Key Features:
- **Automated Queue Generation**: Creates doctor queues every morning at 08:00 AM and automatically deletes them at 18:00 PM.
- **Real-Time Appointment Scheduling**: Dynamically assigns patients to the nearest available doctor.
- **Multi-channel Notifications**: Sends WhatsApp and SMS notifications for appointment confirmations and completions.
- **AI-Enhanced Scheduling**: Utilizes LLMs (Large Language Models) to optimize appointment scheduling based on patient preferences and availability.
- **Daily Working Hours & Breaks**: Ensures that doctors are only assigned appointments between 10:00 AM and 5:00 PM, with a one-hour break from 1:00 PM to 2:00 PM.
- **Scalability**: Supports multiple doctors, patients, and flexible configurations for OPD management.

---

## Table of Contents
1. [How it Works](#how-it-works)
2. [Benefits](#benefits)
3. [Installation](#installation)
4. [Setup](#setup)
5. [Usage](#usage)
6. [Advanced Features](#advanced-features)
7. [Project Structure](#project-structure)
8. [Tech Stack](#tech-stack)
9. [License](#license)

---

## How it Works

### 1. Patient Registration
- **New Patient**: Collects the patient's email, name, and phone number. The patient is then added to the queue.
- **Existing Patient**: Uses the patient ID to retrieve their details from the database and temporarily stores them in the system.

### 2. Daily Queue Creation
- Every working day, doctor-specific queues are generated at **8:00 AM** and are **automatically deleted** at **6:00 PM**.
- Appointments for patients are added based on availability within this time frame.

### 3. Dynamic Appointment Scheduling
- For each job (patient) in the queue, Ashwini identifies the **nearest available doctor** by evaluating all doctor queues.
- The system calculates which doctor’s queue will complete its last appointment first and assigns the patient to that doctor.

### 4. Notifications
- Once the appointment is successfully scheduled, the patient receives both a **WhatsApp** and an **SMS** notification with the appointment details.
- After the appointment is completed, the appointment status is updated, and a **completion notification** is sent to the patient.

### 5. Doctor Availability
- Doctors work from **10:00 AM to 5:00 PM**, with a **lunch break from 1:00 PM to 2:00 PM**.
- Every appointment is set for **12 minutes**, ensuring the system only books appointments during available hours.

### 6. AI Integration
- The system leverages **Large Language Models (LLMs)** to enhance appointment scheduling. AI helps in offering patient-customized appointments and maximizing doctor utilization based on real-time data.

---

## Benefits

- **Reduced Waiting Time**: AI-powered queue assignment ensures patients are seen as quickly as possible.
- **Increased Efficiency**: Automates queue generation and deletion, allowing hospital staff to focus on patient care.
- **Seamless Communication**: Multi-channel notifications improve patient engagement and reduce no-shows.
- **Scalable and Adaptable**: Designed to handle various configurations, from small clinics to large hospitals.
- **Optimized Scheduling**: AI helps allocate appointments to the most appropriate doctor, reducing idle time.

---

## Installation

To install and run the Ashwini system locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/awesome-pro/ashwini.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd ashwini
   ```

3. **Install the dependencies:**
   ```bash
   npm install
   ```

4. **Install Redis**:
   Ensure you have Redis installed on your system. You can install Redis via package managers:
   ```bash
   sudo apt-get install redis
   ```

5. **Set up Python environment**:
   - Make sure Python is installed on your machine.
   - Install necessary Python dependencies using `requirements.txt`:
     ```bash
     pip install -r requirements.txt
     ```

---

## Setup

1. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following configurations:
   ```bash
   DATABASE_URL=your_postgres_db_url
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   REDIS_URL=your_redis_url
   ```

2. **Set up Prisma:**
   Prisma is used for database management.
   - Migrate the database:
     ```bash
     npx prisma migrate dev
     ```

3. **Run the Application:**
   Start the development server using:
   ```bash
   npm run dev
   ```

   The app will be accessible at `http://localhost:3000`.

---

## Usage

1. **Online Access**: Patients and doctors can access the system through a web portal.
2. **Patient Registration**: New patients can register, while returning patients can use their ID for quicker check-in.
3. **Real-Time Queue Updates**: The queue for each doctor is updated in real-time as appointments are scheduled or completed.
4. **Notification System**: Patients receive timely WhatsApp and SMS notifications for their appointments.

---

## Advanced Features

- **AI-Powered Optimizations**: Leverages Python-based AI models to offer the best possible appointment slots based on doctor availability and patient preferences.
- **Cross-Platform Notifications**: Integration with Twilio allows for easy communication across SMS and WhatsApp channels.
- **Automated Queue Management**: Schedules and cleans up queues based on the working hours of doctors, reducing administrative overhead.

---

## Project Structure

```
ashwini-opd-queue/
├── components/       # React components for UI
├── models/           # AI models for enhanced scheduling
├── app/              # Next.js app directory
├── prisma/           # Prisma ORM configurations
├── queue/            # BullMQ job queue management
├── public/           # Static files
├── utils/            # Helper functions
├── api/              # Main server logic
├── redis.js          # Redis configuration
└── worker.js         # BullMQ worker to process job queues
```

---

## Tech Stack

- **Next.js**: Frontend framework for server-side rendering.
- **Node.js**: Backend logic for handling requests.
- **Redis**: Used for job queue storage and real-time queue management.
- **BullMQ**: Task scheduling and processing for appointment queues.
- **Twilio**: For SMS and WhatsApp notifications.
- **Python**: AI models for dynamic, intelligent queue assignment.
- **Prisma**: ORM for PostgreSQL database management.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

With Ashwini, hospitals can revolutionize their OPD operations, ensuring smoother, faster, and more efficient patient handling while using AI to provide a personalized experience for everyone involved.
