import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getJob } from "../../queue";



export async function GET(req: NextRequest) {
   const prisma = new PrismaClient()

   const {searchParams} = new URL(req.url);
    const appointmentId = searchParams.get("appointmentId");
    const queueId = searchParams.get("queueId");

    try {
        if(appointmentId){
            const appointment = await prisma.appointment.findUnique({
                where: {
                    id: appointmentId as string
                }
            })
            console.log(appointment)
            return NextResponse.json(appointment)
        }

        if(queueId){
            // find the job in the queue and return the job
            const job = await getJob(queueId);
            if(job){
                return NextResponse.json(job);
            }

            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        const appointments = await prisma.appointment.findMany()
        console.log(appointments)
        return NextResponse.json(appointments)
    } catch (e) {
        console.error(e)
        if (e instanceof Error) {
            return NextResponse.json({ error: e.message }, { status: 500 })
        } else {
            return NextResponse.json({ error: "Unknown error" }, { status: 500 })
        }
    } finally {
        console.log("Disconnecting")
        await prisma.$disconnect()
    }
}