import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const box = await prisma.box.findMany();
        
        return NextResponse.json(box, { status: 200 });
    } catch (error) {
        console.error("Error fetching boxes:", error);
        return NextResponse.json({ error: "Failed to fetch boxes" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name, content, tab, imageLink, width, height, top, left } = await req.json();

        if (name === undefined || tab === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newBox = await prisma.box.create({
            data: {
                name: name,
                content: content || "",
                tab: tab,
                imageLink: imageLink || "",
                width: width || 20,
                height: height || 20,
                top: top || 0,
                left: left || 0
            },
        });

        return NextResponse.json(newBox, { status: 201 });
    } catch (error) {
        console.error("Error creating a box:", error);
        return NextResponse.json({ error: "Failed to create a box" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { id, name, content, tab, imageLink, width, height, top, left } = await req.json();

        if (!id || name === undefined || content === undefined || imageLink === undefined || tab === undefined || width === undefined || height === undefined || top === undefined || left === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const updatedBox = await prisma.box.update({
            where: { id: id },
            data: {
                name: name,
                content: content,
                tab: tab,
                imageLink: imageLink,
                width: width,
                height: height,
                top: top,
                left: left
            },
        });
        return NextResponse.json(updatedBox, { status: 200 });
    } catch (error) {
        console.error("Error updating a box:", error);
        return NextResponse.json({ error: "Failed to update a box" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ error: "Missing required field: id" }, { status: 400 });
        }
        await prisma.box.delete({
            where: { id: id },
        });
        return NextResponse.json({ message: "Date info deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting a box:", error);
        return NextResponse.json({ error: "Failed to delete a box" }, { status: 500 });
    }   
}