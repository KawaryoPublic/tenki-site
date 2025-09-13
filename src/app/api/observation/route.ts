import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const observation = await prisma.observation.findMany();
        
        return NextResponse.json(observation, { status: 200 });
    } catch (error) {
        console.error("Error fetching observation:", error);
        return NextResponse.json({ error: "Failed to fetch observation" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { day, morning, noon, afterSchool } = await req.json();

        if (!day) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newObservation = await prisma.observation.create({
            data: {
                day: day,
                morning: morning || "",
                noon: noon || "",
                afterSchool: afterSchool || "",
            },
        });

        return NextResponse.json(newObservation, { status: 201 });
    } catch (error) {
        console.error("Error creating observation:", error);
        return NextResponse.json({ error: "Failed to create observation" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { day, morning, noon, afterSchool } = await req.json();

        if (!day || morning === undefined || noon === undefined || afterSchool === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const updatedObservation = await prisma.observation.update({
            where: { day: day },
            data: {
                morning: morning,
                noon: noon,
                afterSchool: afterSchool,
            },
        });
        return NextResponse.json(updatedObservation, { status: 200 });
    } catch (error) {
        console.error("Error updating observation:", error);
        return NextResponse.json({ error: "Failed to update observation" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { day } = await req.json();
        if (!day) {
            return NextResponse.json({ error: "Missing required field: day" }, { status: 400 });
        }
        await prisma.observation.delete({
            where: { day: day },
        });
        return NextResponse.json({ message: "Observation deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting observation:", error);
        return NextResponse.json({ error: "Failed to delete observation" }, { status: 500 });
    }   
}