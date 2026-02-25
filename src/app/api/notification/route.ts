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

        let notifications;
        
        if(id != undefined) {
            notifications = await prisma.notification.findUnique({
                where: { id: Number(id) }
            });
        } else {
            notifications = tier === 3 ? 
                await prisma.notification.findMany({
                    orderBy: { createdAt: 'desc' },
                }) : 
                await prisma.notification.findMany({
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

        return NextResponse.json(notifications, { status: 200 });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
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
        const important = data.get("important");
        const tags = (data.getAll("tag") as string[]).map(tag => tag.trim());
        const urls = data.getAll("url") as string[];
        const filenames = data.getAll("filename") as string[];
        const tier = data.get("tier");
        const roles = data.getAll("role").map(r => Number(r));

        if (title == undefined || content == undefined || tier == undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newNotification = await prisma.notification.create({
            data: {
                title,
                content,
                important: important != undefined,
                tags,
                urls,
                filenames,
                tier: Number(tier),
                roles,
            },
        });

        return NextResponse.json(newNotification, { status: 201 });
    } catch (error) {
        console.error("Error creating a notification:", error);
        return NextResponse.json({ error: "Failed to create a notification" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const currentTier =  await getTier(request);

        if(!checkTier(currentTier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const id = request.nextUrl.searchParams.get("id");
        const data = await request.formData();
        const title = data.get("title") as string;
        const tags = (data.getAll("tag") as string[]).map(tag => tag.trim());
        const content = data.get("content") as string;
        const important = data.get("important");
        const urls = data.getAll("url") as string[];
        const filenames = data.getAll("filename") as string[];
        const deleteFileUrls = data.getAll("deleteFileUrl") as string[];
        const tier = data.get("tier");
        const roles = data.getAll("role").map(r => Number(r));

        if (id == undefined || title == undefined || content == undefined || tier == undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        for (const url of deleteFileUrls) {
            await del(url);
        }

        const updatedNotification = await prisma.notification.update({
            where: { id: Number(id) },
            data: {
                title,
                content,
                important: important != undefined,
                tags,
                urls,
                filenames,
                tier: Number(tier),
                roles,
            },
        });

        return NextResponse.json(updatedNotification, { status: 200 });
    } catch (error) {
        console.error("Error updating a notification:", error);
        return NextResponse.json({ error: "Failed to update a notification" }, { status: 500 });
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

        await prisma.notification.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ message: "Deleted a notification" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting a notification:", error);
        return NextResponse.json({ error: "Failed to delete a notification" }, { status: 500 });
    }
}