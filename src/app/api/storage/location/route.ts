import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";

export async function GET(request: NextRequest) {
    try {
        const tier = await getTier(request);

        if(!checkTier(tier, false, true)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const id = request.nextUrl.searchParams.get("id");

        const locations = id ?
            await prisma.location.findUnique({
                where: { id: Number(id) },
                include: { equipment: true, shelves: true },
            }) :
            await prisma.location.findMany({
                orderBy: { id: 'asc' },
                include: { equipment: true, shelves: true },
            });

        return NextResponse.json(locations, { status: 200 });
    } catch (error) {
        console.error("Error fetching locations:", error);
        return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const tier =  await getTier(request);

        if(!checkTier(tier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const id = Number(request.nextUrl.searchParams.get("id"));
        const data = await request.formData();
        const size = (data.getAll("size") as string[]).map(s => Number(s));

        if (isNaN(id) || size === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
    
        const updatedStorage = await prisma.location.update({
            where: { id: id },
            data: {
                size: size
            },
        });

        return NextResponse.json(updatedStorage, { status: 200 });
    } catch (error) {
        console.error("Error updating a location:", error);
        return NextResponse.json({ error: "Failed to update a location" }, { status: 500 });
    }
}