import { NextRequest, NextResponse } from "next/server";
import { createQueue } from "@/queue/createQueue";
import { doctorQueues } from "@/queue/createQueue";


export async function GET(request: NextRequest){
    const { searchParams } = new URL(request.url);
    const doctorQueueId = searchParams.get("id");

    console.log(doctorQueueId);
    await createQueue();

    if(!doctorQueueId){
        return NextResponse.json({ error: "Doctor queue ID is required" }, { status: 400 });
    }

        
    const doctorQueue = doctorQueues.get(doctorQueueId);

    if(!doctorQueue){
        return NextResponse.json({ error: "Doctor queue not found" }, { status: 404 });
    }

    
    // return the array of all the jobs of any status and their data in the queue
    const jobs = await doctorQueue.getJobs(["completed", "waiting", "active", "failed", "delayed", "paused"]);

    return NextResponse.json(jobs);

}