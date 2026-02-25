import prisma from "@/lib/prisma";
import { DateInfo, Notification } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const notifications = await prisma.notification.findMany() as Notification[];
        const date_info = await prisma.dateInfo.findMany() as DateInfo[];
        const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

        for(const notification of notifications) {
            const updatedAt = new Date(notification.updatedAt);
            if(new Date(updatedAt.getFullYear(), updatedAt.getMonth() + 1, updatedAt.getDate()) <= today) {
                await prisma.notification.delete({
                    where: { id: notification.id },
                });
            }
        }

        for(const info of date_info) {
            const updatedAt = new Date(info.updatedAt);
            if(new Date(updatedAt.getFullYear(), updatedAt.getMonth() + 2, updatedAt.getDate()) <= today) {
                await prisma.dateInfo.delete({
                    where: { date: info.date },
                });
            }
        }

        return NextResponse.json({ message: "Succeeded to run auto deletion" }, { status: 200 });
    } catch(error) {
        console.error("Error running auto deletion:", error);
        return NextResponse.json({ error: "Failed to run auto deletion" }, { status: 500 });
    }
}