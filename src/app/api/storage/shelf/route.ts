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

        const id = Number(request.nextUrl.searchParams.get("id"));

        const shelf = await prisma.shelf.findUnique({
            where: { id: id },
            include: { location: true },
        });

        return NextResponse.json(shelf, { status: 200 });
    } catch (error) {
        console.error("Error fetching a shelf:", error);
        return NextResponse.json({ error: "Failed to fetch a shelf" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const tier =  await getTier(request);

        if(!checkTier(tier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const data = await request.formData();
        const name = data.get("name") as string;
        const type = data.get("type") as string;
        const locationId = data.get("locationId");
        const size = (data.getAll("size") as string[]).map(s => Number(s));
        const position = (data.getAll("position") as string[]).map(s => Number(s));
        const height = [0];

        if (name == undefined || type == undefined || locationId == undefined || size.length !== 2 || position.length !== 2 || height.length === 0) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
    
        const updatedStorage = await prisma.shelf.create({
            data: {
                name,
                type: Number(type),
                locationId: Number(locationId),
                size,
                position,
                height
            },
        });

        return NextResponse.json(updatedStorage, { status: 200 });
    } catch (error) {
        console.error("Error updating a shelf:", error);
        return NextResponse.json({ error: "Failed to update a shelf" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const tier =  await getTier(request);

        if(!checkTier(tier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const id = request.nextUrl.searchParams.get("id");
        const data = await request.formData();
        const size = (data.getAll("size") as string[]).map(s => Number(s));

        if (id == undefined || size == undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
    
        const updatedStorage = await prisma.location.update({
            where: { id: Number(id) },
            data: {
                size: size
            },
        });

        return NextResponse.json(updatedStorage, { status: 200 });
    } catch (error) {
        console.error("Error updating a shelf:", error);
        return NextResponse.json({ error: "Failed to update a shelf" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const tier =  await getTier(request);

        if(!checkTier(tier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const id = request.nextUrl.searchParams.get("id");

        if (id == undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await prisma.shelf.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ message: "Deleted a shelf" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting a shelf:", error);
        return NextResponse.json({ error: "Failed to delete a shelf" }, { status: 500 });
    }
}