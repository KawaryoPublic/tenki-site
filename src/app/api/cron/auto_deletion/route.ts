import prisma from "@/lib/prisma";
import { Notification } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const notifications = await fetch("/api/notification").then(res => res.json()) as Notification[];
        const date_info = await fetch("/api/calendar/date_info").then(res => res.json()) as Notification[];
        const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        const temp1 = [];
        const temp2 = [];

        for(const notification of notifications) {
            const updatedAt = new Date(notification.updatedAt);
            if(new Date(updatedAt.getFullYear(), updatedAt.getMonth(), updatedAt.getDate() + 7) > today) {
                temp1.push(notification);
            }
        }

        for(const info of date_info) {
            const updatedAt = new Date(info.updatedAt);
            if(new Date(updatedAt.getFullYear(), updatedAt.getMonth(), updatedAt.getDate() + 7) > today) {
                temp2.push(info);
            }
        }

        return NextResponse.json({ message: temp1.join(", ") + " | " + temp2.join(",") }, { status: 200 });
    } catch(error) {
        console.error("Error running auto deletion:", error);
        return NextResponse.json({ error: "Failed to run auto deletion" }, { status: 500 });
    }
}