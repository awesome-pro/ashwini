import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


export async function GET(req: NextRequest) {
   const prisma = new PrismaClient()

   const {searchParams} = new URL(req.url);
    const id = searchParams.get("id");

    try {
        if(id){
            const patient = await prisma.patient.findUnique({
                where: {
                    id: id as string
                }
            })
            console.log(patient)
            return NextResponse.json(patient)
        }

        const patients = await prisma.patient.findMany()
        console.log(patients)
        return NextResponse.json(patients)
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

    const { name, email, phone , gender, age} = await req.json();
    console.log("From Patient POST: ", name, email, phone, gender, age);
    try {
        const patient = await prisma.patient.create({
            data: {
                name: name,
                email: email,
                phone: phone,
            }
        })
        //console.log(patient)
        return NextResponse.json(patient, { status: 201 })
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


// update patient

export async function PUT(req: NextRequest) {
    const prisma = new PrismaClient();

    const {searchParams} = new URL(req.url);    
    const id = searchParams.get("id");
    const { name, email, phone } = await req.json();

    try {
        const patient = await prisma.patient.update({
            where: {
                id: id as string
            },
            data: {
                name: name,
                email: email,
                phone: phone,
            }
        })
        console.log(patient)
        return NextResponse.json(patient, { status: 200 })
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


// delete patient

export async function DELETE(req: NextRequest) {
    const prisma = new PrismaClient();

    const {searchParams} = new URL(req.url);    
    const id = searchParams.get("id");

    try {
        const patient = await prisma.patient.delete({
            where: {
                id: id as string
            }
        })
        console.log(patient)
        return NextResponse.json(patient, { status: 200 })
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