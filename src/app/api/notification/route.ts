import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { TIER } from "@/lib/type";
import { uploadFiles } from "@/lib/action";
import { checkTier } from "@/lib/util";

export async function GET(request: NextRequest) {
    try {
        const tier = request.cookies.get("tier")?.value || TIER.NONE;
        const searchParams = await request.nextUrl.searchParams;
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
        const currentTier = request.cookies.get("tier")?.value;

        if(!checkTier(currentTier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }   
        
        const data = await request.formData();
        const title = data.get("title") as string;
        const content = data.get("content") as string;
        const files = data.getAll("files") as File[];
        const tier = data.get("tier") as TIER;

        if (title === undefined || content === undefined || files === undefined || tier === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const blobs = uploadFiles(files);

        const newNotification = await prisma.notification.create({
            data: {
                title,
                content,
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
        const currentTier = request.cookies.get("tier")?.value;

        if(!checkTier(currentTier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const id = Number((await request.nextUrl.searchParams).get("id"));
        const data = await request.formData();
        const title = data.get("title") as string;
        const content = data.get("content") as string;
        const tier = data.get("tier") as TIER;

        if (isNaN(id) || title === undefined || content === undefined || tier === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const updatedNotification = await prisma.notification.update({
            where: { id: id },
            data: {
                title,
                content,
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
        const tier = request.cookies.get("tier")?.value;

        if(!checkTier(tier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const id = Number((await request.nextUrl.searchParams).get("id"));

        if (isNaN(id)) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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