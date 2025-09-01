import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const dateInfo = await prisma.dateInfo.findMany();
        
        return NextResponse.json(dateInfo, { status: 200 });
    } catch (error) {
        console.error("Error fetching date info:", error);
        return NextResponse.json({ error: "Failed to fetch date info" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { date, club, plan } = await req.json();

        if (!date || !club) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newDateInfo = await prisma.dateInfo.create({
            data: {
                date: date,
                club: club,
                plan: plan || "",
            },
        });

        return NextResponse.json(newDateInfo, { status: 201 });
    } catch (error) {
        console.error("Error creating date info:", error);
        return NextResponse.json({ error: "Failed to create date info" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { id, date, club, plan } = await req.json();

        if (!id || !date || club === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const updatedDateInfo = await prisma.dateInfo.update({
            where: { id: id },
            data: {
                date: date,
                club: club,
                plan: plan || "",
            },
        });
        return NextResponse.json(updatedDateInfo, { status: 200 });
    } catch (error) {
        console.error("Error updating date info:", error);
        return NextResponse.json({ error: "Failed to update date info" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ error: "Missing required field: id" }, { status: 400 });
        }
        await prisma.dateInfo.delete({
            where: { id: id },
        });
        return NextResponse.json({ message: "Date info deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting date info:", error);
        return NextResponse.json({ error: "Failed to delete date info" }, { status: 500 });
    }   
}