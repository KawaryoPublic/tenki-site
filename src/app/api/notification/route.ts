import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { TIER } from "@/lib/type";
import { uploadFiles } from "@/lib/action";

export async function GET(request: NextRequest) {
    try {
        const searchParams = await request.nextUrl.searchParams;
        const tier = searchParams.get("tier");
        const id = Number(searchParams.get("id"));

        let notifications;

        if(tier) {
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
        
        if(id) {
            notifications = await prisma.notification.findUnique({
                where: { id: id }
            })
        }   

        if(!tier && !id) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        return NextResponse.json(notifications, { status: 200 });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { title, content, files, tier } = await request.json();
        console.log(files.map((file: any) => file.name));

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
        const { id, title, content, tier } = await request.json();

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
        const { id } = await request.json();

        if (!id) {
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