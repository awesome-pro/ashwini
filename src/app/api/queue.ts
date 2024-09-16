import { createClient } from "redis";
import { Queue, Worker, QueueEvents, Job } from "bullmq";
import IORedis from 'ioredis';
import { Patient, PrismaClient } from "@prisma/client";
import axios from "axios";
import { promises } from "dns";
import { sendSMS, sendWhatsApp } from "./sms";
import { getNearestAvailableDoctorQueue } from "./doctorQueue";

export type Data = {
    name?: string;
    email?: string;
    phone?: string;
    patientId?: string;
    age?: number;
    gender?: string;
}

// create a localhost redis client
export const client = createClient({
  url: "redis://localhost:6379",
});

export const connection = new IORedis({
    host: 'localhost',
    port: 6379,
    maxRetriesPerRequest: null,
});


client.connect().catch(console.error);
client.on("error", console.error)
.on("connect", () => {
    console.log("Connected to Redis");
})
.on("end", () => {
    console.log("Disconnected from Redis");
})
.on("reconnecting", () => {
    console.log("Reconnecting to Redis");
})
.on("ready", () => {
    console.log("Redis is ready");
})
.on("warning", () => {
    console.log("Redis warning");
})
.on("error", (err) => {
    if(err.code === "ECONNREFUSED"){
        console.error("Redis connection refused");
    }
    console.error(err);
});

// create a new queue with the name "queue"
export const queue = new Queue("queue");

// add a job to the queue and return the job id to the caller
export async function addJob(data: Data): Promise<string> {
    const job = await queue.add("queue", { data: data }, { removeOnComplete: 10000, removeOnFail: true, removeDependencyOnFailure: true });
    console.log("From Queue --> Job added to queue: ", job.id);
    return job.id as string;
}

// create a worker for the queue
export const worker = new Worker(
  "queue",
  async (job: Job) => {
    console.log("From Worker <---->", job.data);

    await job.updateProgress(42);

    await job.updateProgress({ state: 'completed' });

    console.log("Processing job from Worker: ", job.id);
    const result = await processQueue(job);
    if(result === "completed"){
      console.log("Worker Job completed: ", job.id);
        await job.updateProgress({ state: 'completed' });
    }

    return result;
  },
  {
    connection: connection,
  }
);

// worker.processJob = async (job: Job) => {
//     await processQueue(job);
// };

worker.on('completed', job => {
    console.log(job);
      // send SMS to patient with number +91-8130635690
    // sendSMS("+918130635690", 
    //   `Your appointment has been scheduled successfully. Details:
    //   ID: ${job.returnvalue.id}
    //   Date: ${job.returnvalue.date}
    //   Doctor: ${job.returnvalue.doctorName}
    //   Duration: ${job.returnvalue.durationMins}
    //   `
    // );
    sendWhatsApp("+918130635690", `Your appointment has been scheduled successfully. Details:
      ID: ${job.returnvalue.id}
      Date: ${job.returnvalue.date}
      Doctor: ${job.returnvalue.doctorName}
      Duration: ${job.returnvalue.durationMins}
      `);

  });
  worker.on('progress', (job: Job, progress: number | object) => {
    // Do something with the return value.
    console.log(`From Worker -->  ${job.id} has progressed to ${progress}`);
  });
  
  worker.on('failed', (job, err) => {
    console.log(`From Worker -->  ${job?.id} has failed with ${err.message}`);
});
worker.on('error', (err) => {
    console.error("From Worker -->  ",err);
});


// create a queue event listener
export const queueEvents = new  QueueEvents("queue");

queueEvents.on('waiting', ({ jobId }) => {
    console.log(`From QueueEvents -->  A job with ID ${jobId} is waiting`);
  });
  
  queueEvents.on('active', ({ jobId, prev }) => {
    console.log(`From QueueEvents -->  Job ${jobId} is now active; previous status was ${prev}`);
  });
  
  queueEvents.on('completed', ({ jobId, returnvalue }) => {
    console.log(`From QueueEvents -->  ${jobId} has completed and returned ${returnvalue}`);
  });
  
  queueEvents.on('failed', ({ jobId, failedReason }) => {
    console.log(`From QueueEvents -->  ${jobId} has failed with reason ${failedReason}`);
  });

  queueEvents.on('progress', ({ jobId, data }, timestamp) => {
    console.log(`From QueueEvents -->  ${jobId} reported progress ${data} at ${timestamp}`);
  });

  async function processQueue(job: Job){
    console.log(job.data);
    await job.updateProgress(42);
    await job.updateProgress({ state: 'completed' });

    const data = await job.data.data

    console.log("From Process -->  ",data);

    const prisma = new PrismaClient();
    try {

        let patient: Patient
        // if patientId is not provided, create a new patient
        if(!data.patientId || data.patientId === ""){
            console.log("Patient not found, creating new patient");
            // convert data to JSON object
            const json = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                gender: data.gender,
                age: data.age
            }
            console.log("json: ", json);
            // create new patient
            const newPatient = await axios.post(`http://localhost:3000/api/patients`, json);
            if(newPatient.status !== 201 && newPatient.status !== 200){
                // log the error, update status as failed and remove the job from the queue
                console.error("Failed to create patient");
                await job.updateProgress({ state: 'failed' });
                return;
            }

            patient = newPatient.data;
        }else{
          const newPatient = await axios.get(`http://localhost:3000/api/patients?id=${data.patientId}`);
          if(newPatient.status !== 200){
              console.error("Patient not found");
              await job.updateProgress({ state: 'failed' });
              return;
          }
          patient = newPatient.data;
        }
        
      //  const { doctorId, lastBookingTime } = await getNearestAvailableDoctorQueue();
      //   if(!doctorId){
      //       console.error("Doctor not found");
      //       await job.updateProgress({ state: 'failed' });
      //       return;
      //   }

      const doctorId = "cm11mzj20000d4nipgua3or0k";
      // 11:00 AM of today
      const lastBookingTime = new Date();
      lastBookingTime.setHours(11, 0, 0, 0);
      console.log("Doctor Id: ", doctorId, "Last Booking Time: ", lastBookingTime, "Patient: ", patient);
        // create appointment
        const appointment = await prisma.appointment.create({
            data: {
                patientId: patient?.id,
                doctorId: doctorId,
                date: new Date(lastBookingTime as Date),
            }
        })

        if(appointment){
            console.log("Appointment created: ", appointment);
            await job.updateProgress({ state: 'completed' });
            // Create a new object like appoitment having docotr name too

            const appointmentWithDoctor = {
                ...appointment,
                doctorName: "Dr. Abhinandan Verma",
                patientName: patient.name
            }

            return appointmentWithDoctor;
        } 
        console.error("Failed to create appointment");
        await job.updateProgress({ state: 'failed' });

    } catch (error) {
        console.error(error);
        await job.updateProgress({ state: 'failed' });
    }
}

export async function getJob(jobID: string): Promise<Job | null> {
    const job = await queue.getJob(jobID);
    if(job){
        console.log("From Queue --> Job found in queue: ", job.id);
        return job;
    }
    return null;
}