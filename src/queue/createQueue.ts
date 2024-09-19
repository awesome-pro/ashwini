import { PrismaClient } from "@prisma/client";
import { isWorkingDay } from "@/lib/utils";
import { Queue } from "bullmq";
import { connection } from "@/app/api/queue";

export const doctorQueues: Map<string, Queue> = new Map();
const prisma = new PrismaClient();

type CreatedQueue = {
    isQueueCreated: boolean;
}

const queueCreation: CreatedQueue = {} as CreatedQueue;

export async function createQueue(){
    if(queueCreation.isQueueCreated){
        console.log("Queues already created :)");
        return;
    }
   try {
    const doctorIds = await prisma.doctor.findMany({ select: { id: true } });
    const doctorIdsArray = doctorIds.map(doctor => doctor.id);
    console.log(doctorIdsArray);

    // create queue for all doctors
    for (const doctorId of doctorIdsArray) {
        await createDoctorQueue(doctorId);
    }
    queueCreation.isQueueCreated = true;

    console.log("Queues created successfully :)");

    // Schedule queue deletion at 6:00 PM
    deleteQueuesAtEndOfDay();
   
   } catch (error) {
       console.error("Error creating queues: ", error);
        return;
   }
    
    
}

async function createDoctorQueue(doctorId: string): Promise<Queue> {
    // Check if the queue already exists, if so, return it
    if (doctorQueues.has(doctorId)) {
      return doctorQueues.get(doctorId)!; // Non-null assertion as we know it exists
    }
  
    // Create a new queue for the doctor
    try {
        const doctorQueue = new Queue(doctorId, {
            connection,
            defaultJobOptions: {
              removeOnComplete: false,
              removeOnFail: false,
            },
          });
      
          // Store the queue in the map
          doctorQueues.set(doctorId, doctorQueue);
      
          return doctorQueue;
    } catch (error) {
        console.error("Error creating queue for doctor: ", doctorId);
        return Promise.reject(new Error(`Failed to create queue for doctor: ${doctorId}`));
    }
}

// Function to delete queues for all doctors at 6:00 PM
export async function deleteQueuesAtEndOfDay() {
    const now = new Date();
    const endTime = new Date();
    endTime.setHours(23, 0, 0, 0); // 06:00 PM
  
    const delay = endTime.getTime() - now.getTime();
  
    // If it's already past 6:00 PM, delete queues immediately
    if (delay <= 0 && isWorkingDay()) {
      console.log('Deleting queues immediately...');
      doctorQueues.forEach((queue) => queue.close());
    } else if (isWorkingDay()) {
      console.log(`Scheduling queue deletion for 6:00 PM...`);
  
      setTimeout(() => {
        console.log('Deleting queues at 6:00 PM...');
        doctorQueues.forEach((queue) => queue.close());
      }, delay);
    }
  }

  // function to find the nearest available doctor queue
  export async function getNearestAvailableDoctorQueue(): Promise<Queue> {
    const now = new Date();
    const endTime = new Date();
    endTime.setHours(23, 0, 0, 0); // 06:00 PM
  
    const delay = endTime.getTime() - now.getTime();
  
    // check for the queue which have least number of jobs
    let minJobs = Number.MAX_SAFE_INTEGER;

    let nearestQueue: Queue | null = null;

    for (const queue of doctorQueues.values()) {
        const jobs = await queue.getJobCounts();
        if(jobs.waiting < minJobs){
            minJobs = jobs.waiting;
            nearestQueue = queue;
        }
    }

    return nearestQueue!;
  }