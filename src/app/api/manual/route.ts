import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";
import { del } from "@vercel/blob";

export async function GET(request: NextRequest) {
    try {
        const tier = await getTier(request);

        if(!checkTier(tier, false, true)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }
        
        const searchParams = request.nextUrl.searchParams;
        const id = Number(searchParams.get("id"));

        let manuals;
        
        if(id) {
            manuals = await prisma.manual.findUnique({
                where: { id: id }
            })
        } else {
            manuals = tier === 3 ? 
                await prisma.manual.findMany({
                    orderBy: { createdAt: 'desc' },
                }) : 
                await prisma.manual.findMany({
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
        }

        return NextResponse.json(manuals, { status: 200 });
    } catch (error) {
        console.error("Error fetching manuals:", error);
        return NextResponse.json({ error: "Failed to fetch manuals" }, { status: 500 });
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
        const content = data.get("content") as string;
        const tags = (data.getAll("tag") as string[]).map(tag => tag.trim());
        const urls = data.getAll("url") as string[];
        const filenames = data.getAll("filename") as string[];
        const tier = data.get("tier") as number;

        if (title === undefined || content === undefined || tier === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newManual = await prisma.manual.create({
            data: {
                title,
                content,
                tags,
                urls,
                filenames,
                tier
            },
        });

        return NextResponse.json(newManual, { status: 201 });
    } catch (error) {
        console.error("Error creating a manual:", error);
        return NextResponse.json({ error: "Failed to create a manual" }, { status: 500 });
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
        const title = data.get("title") as string;
        const content = data.get("content") as string;
        const tags = (data.getAll("tag") as string[]).map(tag => tag.trim());
        const urls = data.getAll("url") as string[];
        const filenames = data.getAll("filename") as string[];
        const deleteFileUrls = data.getAll("deleteFileUrl") as string[];
        const tier = data.get("tier") as number;

        if (isNaN(id) || title === undefined || content === undefined || tier === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        for (const url of deleteFileUrls) {
            await del(url);
        }

        const updatedManual = await prisma.manual.update({
            where: { id: id },
            data: {
                title,
                content,
                tags,
                urls,
                filenames,
                tier
            },
        });

        return NextResponse.json(updatedManual, { status: 200 });
    } catch (error) {
        console.error("Error updating a manual:", error);
        return NextResponse.json({ error: "Failed to update a manual" }, { status: 500 });
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

        await prisma.manual.delete({
            where: { id: id },
        });

        return NextResponse.json({ message: "Manual deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting a manual:", error);
        return NextResponse.json({ error: "Failed to delete a manual" }, { status: 500 });
    }
}