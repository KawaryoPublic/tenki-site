import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";
import { del } from "@vercel/blob";

export async function GET(request: NextRequest) {
    try {
        const tier = await getTier(request);
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get("id");

        if(!checkTier(tier, false, true)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }  

        let equipment;
        
        if(id == undefined) {
            equipment = await prisma.equipment.findMany({
                orderBy: { createdAt: 'desc' },
            });
        } else {
            equipment = await prisma.equipment.findUnique({
                where: { id: Number(id) },
                include: { location: true }
            });
        }

        return NextResponse.json(equipment, { status: 200 });
    } catch (error) {
        console.error("Error fetching equipment:", error);
        return NextResponse.json({ error: "Failed to fetch equipment" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const tier = await getTier(request);

        if(!checkTier(tier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }   
        
        const data = await request.formData();
        const name = data.get("name") as string;
        const locationId = data.get("locationId");
        const number = data.get("number");
        const size = (data.getAll("size") as string[]).map(s => Number(s));
        const contents = data.getAll("content") as string[];
        const description = data.get("description") as string;
        const tags = (data.getAll("tag") as string[]).map(tag => tag.trim());
        const urls = data.getAll("url") as string[];
        const filenames = data.getAll("filename") as string[];

        if (name == undefined || locationId == undefined || number == undefined || size.length !== 3 || contents == undefined || description == undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newEquipment = await prisma.equipment.create({
            data: {
                name,
                locationId: Number(locationId),
                number: Number(number),
                size,
                contents,
                description,
                tags,
                urls,
                filenames
            },
        });

        return NextResponse.json(newEquipment, { status: 201 });
    } catch (error) {
        console.error("Error creating equipment:", error);
        return NextResponse.json({ error: "Failed to create equipment" }, { status: 500 });
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
        const name = data.get("name") as string;
        const locationId = data.get("locationId");
        const number = data.get("number");
        const size = (data.getAll("size") as string[]).map(s => Number(s));
        const contents = data.getAll("content") as string[];
        const description = data.get("description") as string;
        const tags = (data.getAll("tag") as string[]).map(tag => tag.trim());
        const urls = data.getAll("url") as string[];
        const filenames = data.getAll("filename") as string[];
        const deleteFileUrls = data.getAll("deleteFileUrl") as string[];

        if (id == undefined || name == undefined || locationId == undefined || number == undefined || size.length !== 3 || contents == undefined || description == undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        for (const url of deleteFileUrls) {
            await del(url);
        }

        const updatedEquipment = await prisma.equipment.update({
            where: { id: Number(id) },
            data: {
                name,
                locationId: Number(locationId),
                number: Number(number),
                size,
                contents,
                description,
                tags,
                urls,
                filenames
            },
        });

        return NextResponse.json(updatedEquipment, { status: 200 });
    } catch (error) {
        console.error("Error updating equipment:", error);
        return NextResponse.json({ error: "Failed to update equipment" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { urls } = await request.json();
        const tier =  await getTier(request);

        if(!checkTier(tier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const id = request.nextUrl.searchParams.get("id");

        if (id == undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        for (const url of urls) {
            await del(url);
        }

        await prisma.equipment.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ message: "Deleted equipment" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting equipment:", error);
        return NextResponse.json({ error: "Failed to delete equipment" }, { status: 500 });
    }
}