import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        return NextResponse.json({ message: "auto_deletion" }, { status: 200 });
    } catch(error) {
        console.error("Error running auto deletion:", error);
        return NextResponse.json({ error: "Failed to run auto deletion" }, { status: 500 });
    }
}