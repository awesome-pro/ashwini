import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { queue, addJob, client, connection, worker, queueEvents, Data } from "../queue";
import { Job } from "bullmq";
import axios from "axios";


export async function GET(req: NextRequest) {
   const prisma = new PrismaClient()

   const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    try {
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


export async function POST(req: NextRequest) {
    const prisma = new PrismaClient();

    const { doctorId, patientId, date, gender, name, age , email, phone} = await req.json();

    console.log("From Appointment POST: ", doctorId, patientId, date, gender, name, age, email, phone);

    try {
        // const appointment = await prisma.appointment.create({
        //     data: {
        //         patientId: patientId,
        //         doctorId: doctorId,
        //         date: new Date(date)
        //     }
        // })
        // console.log(appointment)
        // return NextResponse.json(appointment, { status: 201 })

        // add job to queue
        const data: Data = {
            patientId: patientId,
            gender: gender,
            age: age,
            name: name,
            email: email,
            phone: phone
        }

        console.log(data);

        const jobId = await addJob(data);

        return NextResponse.json({ message: "Job added to queue", jobId: jobId }, { status: 201 })

    } catch (e) {
        console.error(e)
        if (e instanceof Error) {
            return NextResponse.json({ error: e.message }, { status: 500 })
        } else {
            return NextResponse.json({ error: "Unknown error" }, { status: 500 })
        }
    } finally {
        console.log("Disconnecting")
        //await prisma.$disconnect()
    }
}


// update appointment

export async function PUT(req: NextRequest) {
    const prisma = new PrismaClient();

    const {searchParams} = new URL(req.url);    
    const id = searchParams.get("id");

    const { patientId, doctorId, time, } = await req.json();

    try {
        const appointment = await prisma.appointment.update({
            where: {
                id: id as string
            },
            data: {
                patientId: patientId,
                doctorId: doctorId,
                date: new Date(time)
            }
        })
        console.log(appointment)
        return NextResponse.json(appointment, { status: 201 })
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


// delete appointment
export async function DELETE(req: NextRequest) {
    const prisma = new PrismaClient();

    const {searchParams} = new URL(req.url);    
    const id = searchParams.get("id");

    try {
        const appointment = await prisma.appointment.delete({
            where: {
                id: id as string
            }
        })
        console.log(appointment)
        return NextResponse.json(appointment, { status: 201 })
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


