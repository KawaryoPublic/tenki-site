import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { checkTier } from "@/lib/utils";
import { getTier } from "@/lib/actions";

export async function GET(request: NextRequest) {
    try {
        const tier = await getTier(request);

        if(!checkTier(tier, false, true)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get("id");

        let files;
        
        if(id == undefined) {
            files = checkTier(tier) ? 
                await prisma.file.findMany({
                    orderBy: { createdAt: 'desc' },
                }) : 
                await prisma.file.findMany({
                    where: {
                        OR: [
                            {
                                tier: tier
                            },
                            {
                                tier: 0
                            }
                        ]
                    },
                    orderBy: { createdAt: 'desc' },
                });
        } else {
            files = await prisma.file.findUnique({
                where: { id: Number(id) }
            });
        }

        return NextResponse.json(files, { status: 200 });
    } catch (error) {
        console.error("Error fetching files:", error);
        return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const currentTier = await getTier(request);

        if(!checkTier(currentTier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const data = await request.formData();
        const title = data.get("title") as string;
        const url = data.get("url") as string;
        const tags = (data.getAll("tag") as string[]).map(tag => tag.trim());
        const tier = data.get("tier");

        if (title == undefined || url == undefined || tags == undefined || tier == undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newFile = await prisma.file.create({
            data: {
                title,
                url,
                tags,
                tier: Number(tier)
            },
        });

        return NextResponse.json(newFile, { status: 201 });
    } catch (error) {
        console.error("Error creating a file:", error);
        return NextResponse.json({ error: "Failed to create a file" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const currentTier = await getTier(request);

        if(!checkTier(currentTier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const id = request.nextUrl.searchParams.get("id");
        const data = await request.formData();
        const title = data.get("title") as string;
        const url = data.get("url") as string;
        const tags = (data.getAll("tag") as string[]).map(tag => tag.trim());
        const tier = data.get("tier");

        if (id == undefined || title == undefined || url == undefined || tags == undefined || tier == undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const udpateFile = await prisma.file.update({
            where: { id: Number(id) },
            data: {
                title,
                url,
                tags,
                tier: Number(tier)
            },
        });

        return NextResponse.json(udpateFile, { status: 200 });
    } catch (error) {
        console.error("Error updating a file:", error);
        return NextResponse.json({ error: "Failed to update a file" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const tier = await getTier(request);

        if(!checkTier(tier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const id = request.nextUrl.searchParams.get("id");

        if (id == undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await prisma.file.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ message: "Deleted a file" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting a file:", error);
        return NextResponse.json({ error: "Failed to delete a file" }, { status: 500 });
    }
}