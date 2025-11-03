import { getTier } from "@/lib/action";
import prisma from "@/lib/prisma";
import { checkTier } from "@/lib/util";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const tier = await getTier(request);

        if(!checkTier(tier, false, true)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const date = request.nextUrl.searchParams.get("date");

        const dateInfo = date ? 
            await prisma.dateInfo.findUnique({
                where: { date: date },
            }) :
            await prisma.dateInfo.findMany();
            
        return NextResponse.json(dateInfo, { status: 200 });
    } catch (error) {
        console.error("Error fetching date info:", error);
        return NextResponse.json({ error: "Failed to fetch date info" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const tier = await getTier(request);

        if(!checkTier(tier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const date = request.nextUrl.searchParams.get("date");

        if (!date) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newDateInfo = await prisma.dateInfo.create({
            data: {
                date: date,
                plan: "",
                event: "",
                holiday: "",
            },
        });

        return NextResponse.json(newDateInfo, { status: 201 });
    } catch (error) {
        console.error("Error creating date info:", error);
        return NextResponse.json({ error: "Failed to create date info" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const tier = await getTier(request);

        if(!checkTier(tier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const date = request.nextUrl.searchParams.get("date");
        const data = await request.formData();
        const plan = data.get("plan") as string;
        const event = data.get("event") as string;
        const holiday = data.get("holiday") as string;

        if (!date || plan === undefined || event === undefined || holiday === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const updatedDateInfo = await prisma.dateInfo.update({
            where: { date: date },
            data: {
                date: date,
                plan: plan,
                event: event,
                holiday: holiday,
            },
        });
        return NextResponse.json(updatedDateInfo, { status: 200 });
    } catch (error) {
        console.error("Error updating date info:", error);
        return NextResponse.json({ error: "Failed to update date info" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const tier = await getTier(request);

        if(!checkTier(tier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const date = request.nextUrl.searchParams.get("date");
        if (!date) {
            return NextResponse.json({ error: "Missing required field: id" }, { status: 400 });
        }
        await prisma.dateInfo.delete({
            where: { date: date },
        });
        return NextResponse.json({ message: "Date info deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting date info:", error);
        return NextResponse.json({ error: "Failed to delete date info" }, { status: 500 });
    }   
}