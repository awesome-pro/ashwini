import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
   const prisma = new PrismaClient()
   const {searchParams} = new URL(req.url);
    const id = searchParams.get("id");

    try {

        if(id){
            const doctor = await prisma.doctor.findUnique({
                where: {
                    id: id as string
                }
            })
            console.log(doctor)
            return NextResponse.json(doctor)
        }

        const doctors = await prisma.doctor.findMany()
        console.log(doctors)
        return NextResponse.json(doctors)
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

    const { name, email, phone, available,} = await req.json();

    try {
        const doctor = await prisma.doctor.create({
            data: {
                name: name,
                email: email,
                phone: phone,
                available: available,
            }
        })
        console.log(doctor)
        return NextResponse.json(doctor, { status: 201 })
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


// update doctor

export async function PUT(req: NextRequest) {
    const prisma = new PrismaClient();

    const {searchParams} = new URL(req.url);    
    const id = searchParams.get("id");
    const { name, email, phone, available,} = await req.json();

    try {
        const doctor = await prisma.doctor.update({
            where: {
                id: id as string
            },
            data: {
                name: name,
                email: email,
                phone: phone,
                available: available,
            }
        })
        console.log(doctor)
        return NextResponse.json(doctor, { status: 201 })
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


export async function DELETE(req: NextRequest) {
    const prisma = new PrismaClient();

    const {searchParams} = new URL(req.url);    
    const id = searchParams.get("id");

    try {
        const doctor = await prisma.doctor.delete({
            where: {
                id: id as string
            }
        })
        console.log(doctor)
        return NextResponse.json(doctor, { status: 201 })
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