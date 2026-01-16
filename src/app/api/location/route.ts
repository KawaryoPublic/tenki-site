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
            }) :
            await prisma.location.findMany({
                orderBy: { id: 'asc' },
            });

        return NextResponse.json(locations, { status: 200 });
    } catch (error) {
        console.error("Error fetching locations:", error);
        return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 });
    }
}

/*
export async function PUT(request: NextRequest) {
    try {
        const currentTier =  await getTier(request);

        if(!checkTier(currentTier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const id = Number(request.nextUrl.searchParams.get("id"));
        const data = await request.formData();
        const locations = data.getAll("locations") as string[];
        const url = data.get("url") as string;
        const deleteFileUrl = data.get("deleteFileUrl") as string;

        if (isNaN(id) || locations === undefined || url === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        
        await del(deleteFileUrl);
    
        const updatedStorage = await prisma.storage.update({
            where: { id: id },
            data: {
                locations,
                url,
            },
        });

        return NextResponse.json(updatedStorage, { status: 200 });
    } catch (error) {
        console.error("Error updating a storage:", error);
        return NextResponse.json({ error: "Failed to update a storage" }, { status: 500 });
    }
}
*/