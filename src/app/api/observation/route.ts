import prisma from "@/lib/prisma";
import { checkTier } from "@/lib/util";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const tier = request.cookies.get("tier")?.value;

        if(!checkTier(tier, false, true)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const searchParams = await request.nextUrl.searchParams;
        const day = Number(searchParams.get("day"));
        const filter = searchParams.get("filter");

        let observations;

        if(day) {
            observations = await prisma.observation.findUnique({
                where: { day: day },
            });
        }

        if(filter) {
            observations = await prisma.observation.findMany({
                where: {
                    OR: [
                        { morning: { contains: filter } },
                        { noon: { contains: filter } },
                        { afterSchool: { contains: filter } },
                    ],
                },
            });
        }

        if(!day && !filter) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        return NextResponse.json(observations, { status: 200 });
    } catch (error) {
        console.error("Error fetching observation:", error);
        return NextResponse.json({ error: "Failed to fetch observation" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const tier = request.cookies.get("tier")?.value;

        if(!checkTier(tier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const day = Number((await request.nextUrl.searchParams).get("day"));
        const data = await request.formData();
        const morning = data.get("morning") as string;
        const noon = data.get("noon") as string;
        const afterSchool = data.get("afterSchool") as string;

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