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

        const searchParams = request.nextUrl.searchParams;
        const day = Number(searchParams.get("day"));

        const observations = day ? 
            await prisma.observation.findUnique({
                where: { day: day },
            }) : 
            await prisma.observation.findMany();

        return NextResponse.json(observations, { status: 200 });
    } catch (error) {
        console.error("Error fetching observation:", error);
        return NextResponse.json({ error: "Failed to fetch observation" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const tier = await getTier(request);

        if(!checkTier(tier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const day = Number(request.nextUrl.searchParams.get("day"));
        const data = await request.formData();
        const morning = data.getAll("morning") as string[];
        const noon = data.getAll("noon") as string[];
        const afterSchool = data.getAll("afterSchool") as string[];

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