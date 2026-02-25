import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        return NextResponse.json({ message: "observation_notification" }, { status: 200 });
    } catch(error) {
        console.error("Error notifying an observation:", error);
        return NextResponse.json({ error: "Failed to notify an observation" }, { status: 500 });
    }
}