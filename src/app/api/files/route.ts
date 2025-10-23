import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const files = await prisma.file.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(files, { status: 200 });
    } catch (error) {
        console.error("Error fetching files:", error);
        return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { title, url, category, tags, tier } = await request.json();

        if (title === undefined || url === undefined || category === undefined || tags === undefined || tier === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newFile = await prisma.file.create({
            data: {
                title,
                url,
                category,
                tags,
                tier
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
        const { id, title, url, category, tags, tier } = await request.json();

        if (!id || title === undefined || url === undefined || category === undefined || tags === undefined || tier === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const udpateFile = await prisma.file.update({
            where: { id },
            data: {
                title,
                url,
                category,
                tags,
                tier
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
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await prisma.file.delete({
            where: { id },
        });

        return NextResponse.json({ message: "File deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting a file:", error);
        return NextResponse.json({ error: "Failed to delete a file" }, { status: 500 });
    }
}