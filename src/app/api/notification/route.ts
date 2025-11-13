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

        let notifications;
        
        if(id) {
            notifications = await prisma.notification.findUnique({
                where: { id: id }
            })
        } else {
            notifications = tier === TIER.ADMIN ? 
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
                                tier: TIER.NONE
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
        const tags = (data.getAll("tag") as string[]).map(tag => tag.trim());
        const urls = data.getAll("url") as string[];
        const filenames = data.getAll("filename") as string[];
        const tier = data.get("tier") as TIER;

        if (title === undefined || content === undefined || tier === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newNotification = await prisma.notification.create({
            data: {
                title,
                content,
                tags,
                urls,
                filenames,
                tier
            },
        });

        return NextResponse.json(newNotification, { status: 201 });
    } catch (error) {
        console.error("Error creating notification:", error);
        return NextResponse.json({ error: "Failed to create notification" }, { status: 500 });
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
        const tags = (data.getAll("tag") as string[]).map(tag => tag.trim());
        const content = data.get("content") as string;
        const urls = data.getAll("url") as string[];
        const filenames = data.getAll("filename") as string[];
        const deleteFileUrls = data.getAll("deleteFileUrl") as string[];
        const tier = data.get("tier") as TIER;

        if (isNaN(id) || title === undefined || content === undefined || tier === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        for (const url of deleteFileUrls) {
            await del(url);
        }

        const updatedNotification = await prisma.notification.update({
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

        return NextResponse.json(updatedNotification, { status: 200 });
    } catch (error) {
        console.error("Error updating notification:", error);
        return NextResponse.json({ error: "Failed to update notification" }, { status: 500 });
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

        await prisma.notification.delete({
            where: { id: id },
        });

        return NextResponse.json({ message: "Notification deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting notification:", error);
        return NextResponse.json({ error: "Failed to delete notification" }, { status: 500 });
    }
}