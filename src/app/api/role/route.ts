import { getTier } from "@/lib/actions";
import prisma from "@/lib/prisma";
import { checkTier } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const tier = await getTier(request);

        if(!checkTier(tier, false, true)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get("id");

        const observations = id == undefined ? 
            await prisma.role.findMany() :
            await prisma.role.findUnique({
                where: { id: Number(id) },
            });

        return NextResponse.json(observations, { status: 200 });
    } catch (error) {
        console.error("Error fetching observations:", error);
        return NextResponse.json({ error: "Failed to fetch observations" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const tier = await getTier(request);

        if(!checkTier(tier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const day = request.nextUrl.searchParams.get("day");
        const data = await request.formData();
        const morning = data.getAll("morning") as string[];
        const noon = data.getAll("noon") as string[];
        const afterSchool = data.getAll("afterSchool") as string[];

        if (day == undefined || morning == undefined || noon == undefined || afterSchool == undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const updatedObservation = await prisma.observation.update({
            where: { day: Number(day) },
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