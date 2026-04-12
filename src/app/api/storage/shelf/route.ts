import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";
import { Shelf } from "@/lib/types";

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

        const data = await request.json();
        const { shelves, locationId } = data;

        if (!Array.isArray(shelves) || locationId == undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
    
        const createdShelves = await prisma.shelf.createMany({
            data: shelves.map(shelf => ({
                name: shelf.name,
                type: Number(shelf.type),
                locationId: Number(locationId),
                size: shelf.size,
                position: shelf.position,
                height: shelf.height,
                equipment: [],
            })),
        });

        return NextResponse.json(createdShelves, { status: 200 });
    } catch (error) {
        console.error("Error creating shelves:", error);
        return NextResponse.json({ error: "Failed to create shelves" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const tier =  await getTier(request);

        if(!checkTier(tier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const data = await request.json();
        const { shelves, locationId } = data;

        if (!Array.isArray(shelves) || locationId == undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const updatedShelves: Shelf[] = [];

        for (const shelf of shelves) {
            const updatedShelf = await prisma.shelf.update({
                where: { id: shelf.id },
                data: {
                    name: shelf.name,
                    type: Number(shelf.type),
                    locationId: Number(locationId),
                    size: shelf.size,
                    position: shelf.position,
                    height: shelf.height,
                    equipment: shelf.equipment,
                },
            });

            updatedShelves.push(updatedShelf);
        }

        return NextResponse.json(updatedShelves, { status: 200 });
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