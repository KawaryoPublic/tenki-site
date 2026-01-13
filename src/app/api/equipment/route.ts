import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { TIER } from "@/lib/types";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";
import { del } from "@vercel/blob";

export async function GET(request: NextRequest) {
    try {
        const tier = await getTier(request);
        const searchParams = request.nextUrl.searchParams;
        const id = Number(searchParams.get("id"));

        let equipment;
        
        if(id) {
            equipment = await prisma.equipment.findUnique({
                where: { id: id }
            })
        } else {
            equipment = tier === TIER.ADMIN ? 
                await prisma.equipment.findMany({
                    orderBy: { createdAt: 'desc' },
                }) : 
                await prisma.equipment.findMany({
                    where: {
                        OR: [
                            {
                                tier: tier
                            },
                            {
                                tier: TIER.NONE
                            }
                        ]
                    },
                    orderBy: { createdAt: 'desc' },
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
        const currentTier = await getTier(request);

        if(!checkTier(currentTier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }   
        
        const data = await request.formData();
        const name = data.get("name") as string;
        const location = data.get("location") as string;
        const content = data.getAll("content") as string[];
        const description = data.get("description") as string;
        const tags = (data.getAll("tag") as string[]).map(tag => tag.trim());
        const urls = data.getAll("url") as string[];
        const filenames = data.getAll("filename") as string[];
        const tier = data.get("tier") as TIER;

        if (name === undefined || content === undefined || description === undefined || tier === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newEquipment = await prisma.equipment.create({
            data: {
                name,
                location,
                content,
                description,
                tags,
                urls,
                filenames,
                tier
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
        const currentTier =  await getTier(request);

        if(!checkTier(currentTier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const id = Number(request.nextUrl.searchParams.get("id"));
        const data = await request.formData();
        const name = data.get("name") as string;
        const location = data.get("location") as string;
        const content = data.getAll("content") as string[];
        const description = data.get("description") as string;
        const tags = (data.getAll("tag") as string[]).map(tag => tag.trim());
        const urls = data.getAll("url") as string[];
        const filenames = data.getAll("filename") as string[];
        const deleteFileUrls = data.getAll("deleteFileUrl") as string[];
        const tier = data.get("tier") as TIER;

        if (isNaN(id) || name === undefined || content === undefined || description === undefined || tier === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        for (const url of deleteFileUrls) {
            await del(url);
        }

        const updatedEquipment = await prisma.equipment.update({
            where: { id: id },
            data: {
                name,
                location,
                content,
                description,
                tags,
                urls,
                filenames,
                tier
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

        const id = Number(request.nextUrl.searchParams.get("id"));

        if (isNaN(id)) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        for (const url of urls) {
            await del(url);
        }

        await prisma.equipment.delete({
            where: { id: id },
        });

        return NextResponse.json({ message: "Equipment deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting equipment:", error);
        return NextResponse.json({ error: "Failed to delete equipment" }, { status: 500 });
    }
}