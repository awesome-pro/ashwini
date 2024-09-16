import { Queue, Worker, QueueEvents, Job } from "bullmq";
import IORedis from 'ioredis';
import { PrismaClient } from "@prisma/client";
import { isWorkingDay } from "@/lib/utils";

export const connection = new IORedis({
    host: 'localhost',
    port: 6379,
    maxRetriesPerRequest: null,
});

// Store queues by doctorId
export const doctorQueues: Map<string, Queue> = new Map();
const prisma = new PrismaClient();

async function createDoctorQueue(doctorId: string): Promise<Queue> {
    // Check if the queue already exists, if so, return it
    if (doctorQueues.has(doctorId)) {
      return doctorQueues.get(doctorId)!; // Non-null assertion as we know it exists
    }
  
    // Create a new queue for the doctor
    const doctorQueue = new Queue(doctorId, {
      connection,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: false,
      },
    });

     // Schedule the queue to delete automatically after 6:00 PM on the day of creation
     scheduleQueueDeletion(doctorId, doctorQueue);

    // Store the queue in the map
    doctorQueues.set(doctorId, doctorQueue);

    return doctorQueue;
}
  
async function scheduleQueueDeletion(doctorId: string, queue: Queue) {
    const now = new Date();
    const deletionTime = new Date();
    deletionTime.setHours(18, 0, 0, 0); // Set the deletion time to 6:00 PM
  
    // Calculate the delay (time remaining until 6:00 PM)
    const delay = deletionTime.getTime() - now.getTime();
  
    if (delay > 0) {
      // Use setTimeout to schedule deletion
      setTimeout(async () => {
        console.log(`Deleting queue for doctor ${doctorId}...`);
  
        // Clean up the queue (delete jobs and close the queue)
        await queue.drain();
        await queue.close();
  
        // Remove the queue from the map
        doctorQueues.delete(doctorId);
  
        console.log(`Queue for doctor ${doctorId} has been deleted.`);
      }, delay);
    } else {
      // If it's already past 6:00 PM, delete the queue immediately
      queue.drain().then(() => queue.close()).then(() => {
        doctorQueues.delete(doctorId);
        console.log(`Queue for doctor ${doctorId} deleted (past 6:00 PM).`);
      });
    }
  }


  // Function to create queues for all doctors at 08:00 AM on working days
export async function scheduleQueueCreationForAllDoctors(doctorIds: string[]) {
    const now = new Date();
    const creationTime = new Date();
    creationTime.setHours(8, 0, 0, 0); // 08:00 AM
  
    const delay = creationTime.getTime() - now.getTime();
  
    // If it's already past 08:00 AM, create queues immediately for today
    if (delay <= 0 && isWorkingDay()) {
      console.log('Creating queues immediately...');
      doctorIds.forEach(createDoctorQueue);
    } else if (isWorkingDay()) {
      console.log(`Scheduling queue creation for 08:00 AM...`);
  
      setTimeout(() => {
        console.log('Creating queues at 08:00 AM...');
        doctorIds.forEach(createDoctorQueue);
      }, delay);
    }
  }
  
  // Function to start the process for creating queues every day at 08:00 AM
  // return a value if all queue
  async function startDailyQueueCreation(doctorIds: string[]) {
    scheduleQueueCreationForAllDoctors(doctorIds);
  
    // Set up the next day's queue creation at 08:00 AM
    setInterval(() => {
      const now = new Date();
      if (now.getHours() === 8 && isWorkingDay()) {
        console.log('Creating queues for the day...');
        doctorIds.forEach(createDoctorQueue);
      }
    }, 24 * 60 * 60 * 1000); // Check once every 24 hours

    // Check if queues exist for all doctors
    const queuesExist = doctorIds.every((doctorId) => doctorQueues.has(doctorId));
    if (!queuesExist) {
      console.log('Queues not created for all doctors yet...');
      doctorIds.forEach(createDoctorQueue);
    }

    console.log('All queues created successfully.');

  }


  // Helper to get the end time of the last job (appointment) in the queue
async function getLastJobEndTime(queue: Queue): Promise<Date | null> {
    const jobs: Job[] = await queue.getJobs(['completed', 'waiting', 'active', 'failed'], 0, 1, false);
  
    if (jobs.length === 0) {
      // No jobs exist, so the doctor is available at 10:00 AM
      const startOfDay = new Date();
      startOfDay.setHours(10, 0, 0, 0); // 10:00 AM
      return startOfDay;
    }
  
    // Get the last job (the latest job in the queue)
    const lastJob = jobs[0];
    const appointmentTime = new Date(lastJob.data.appointmentTime); // Assuming appointmentTime is stored in the job data
    const endTime = new Date(appointmentTime);
    endTime.setMinutes(endTime.getMinutes() + 12); // Default duration of 12 minutes per appointment
    console.log("End Time: for queue", endTime, queue.name);
    return endTime;
}
// Main logic to find the nearest available doctor queue based on the end time of the last job
export async function getNearestAvailableDoctorQueue(): Promise<{ doctorId: string | null, lastBookingTime: Date | null }> {
    console.log("Doctor Queues: ", doctorQueues);
    let nearestQueue: Queue | null = null;
    let earliestEndTime: Date | null = null;
  
    // Start the daily queue creation process
    const doctorData = await prisma.doctor.findMany();
    console.log("Doctor Data: ", doctorData);
    const doctorIds = doctorData.map((doctor) => doctor.id);
    console.log("Doctor Ids: ", doctorIds);
    await startDailyQueueCreation(doctorIds);

    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(17, 0, 0, 0); // 5:00 PM
  
    for (const [doctorId, queue] of doctorQueues.entries()) {
      const lastJobEndTime = await getLastJobEndTime(queue);
  
      // Only consider doctors whose last job end time is before 5:00 PM
      if (lastJobEndTime && lastJobEndTime < endOfDay && lastJobEndTime > now) {
        if (
          !earliestEndTime ||
          lastJobEndTime < earliestEndTime || // Check if the current doctor has an earlier end time
          (lastJobEndTime.getTime() === earliestEndTime.getTime() && nearestQueue && doctorId < nearestQueue.name) // Tiebreaker: Alphabetical comparison
        ) {
          nearestQueue = queue;
          earliestEndTime = lastJobEndTime;
        }
      }
    }
  
    console.log('Nearest queue:', nearestQueue);

    return {
        doctorId: nearestQueue ? nearestQueue.name : null,
        lastBookingTime: nearestQueue ? await getLastJobEndTime(nearestQueue) : null
    }
  }