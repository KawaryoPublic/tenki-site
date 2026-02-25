import prisma from "@/lib/prisma";
import { DateInfo, Observation } from "@/lib/types";
import { getDateId } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const date_info = await prisma.dateInfo.findUnique({
            where: { date: getDateId(new Date())}
        }) as DateInfo;

        if(date_info?.holiday?.length) {
            return NextResponse.json({ message: `休日観測: ${date_info.holiday}` }, { status: 200 });
        }

        const observation = await prisma.observation.findUnique({
            where: { day: new Date().getDay()}
        }) as Observation;

        return NextResponse.json({ message: `朝観測: ${observation.morning}, 昼観測: ${observation.noon}, 放課後観測: ${observation.afterSchool}` }, { status: 200 });
    } catch(error) {
        console.error("Error notifying an observation:", error);
        return NextResponse.json({ error: "Failed to notify an observation" }, { status: 500 });
    }
}