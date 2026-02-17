import { getTier } from "@/lib/actions";
import prisma from "@/lib/prisma";
import { checkTier } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";

export async function GET(request: NextRequest) {
    try {
        const tier = await getTier(request);

        if(!checkTier(tier, false, true)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get("id");

        const observations = id == undefined ? 
            await prisma.role.findMany() :
            await prisma.role.findUnique({
                where: { id: Number(id) },
            });

        return NextResponse.json(observations, { status: 200 });
    } catch (error) {
        console.error("Error fetching roles:", error);
        return NextResponse.json({ error: "Failed to fetch roles" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const tier = await getTier(request);

        if(!checkTier(tier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const data = await request.formData();
        const name = data.get("name") as string;
        const description = data.get("description") as string;
        const person = data.get("person") as string;
        const personDetail = data.get("personDetail") as string;
        const markUrl = data.get("markUrl") as string;
        const personImageUrl = data.get("personImageUrl") as string;
        const urls = data.getAll("url") as string[];

        if (name == undefined || description == undefined || person == undefined || personDetail == undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const createdRole = await prisma.role.create({
            data: {
                name,
                description,
                markUrl: markUrl == null ? urls[0] : markUrl,
                person,
                personDetail,
                personImageUrl: personImageUrl == null ? urls[markUrl == null ? 1 : 0] : personImageUrl,
            },
        });
        return NextResponse.json(createdRole, { status: 200 });
    } catch (error) {
        console.error("Error creating a observation:", error);
        return NextResponse.json({ error: "Failed to create a role" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const tier = await getTier(request);

        if(!checkTier(tier)) {
            return NextResponse.json({ error: "Permission denied" }, { status: 403 });
        }

        const id = request.nextUrl.searchParams.get("id");
        const data = await request.formData();
        const name = data.get("name") as string;
        const description = data.get("description") as string;
        const person = data.get("person") as string;
        const personDetail = data.get("personDetail") as string;
        const markUrl = data.get("markUrl") as string;
        const personImageUrl = data.get("personImageUrl") as string;
        const urls = data.getAll("url") as string[];
        const deleteFileUrls = data.getAll("deleteFileUrl") as string[];

        if (id == undefined || name == undefined || description == undefined || person == undefined || personDetail == undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        for (const url of deleteFileUrls) {
            await del(url);
        }

        const updatedRole = await prisma.role.update({
            where: { id: Number(id) },
            data: {
                name,
                description,
                markUrl: markUrl == null ? urls[0] : markUrl,
                person,
                personDetail,
                personImageUrl: personImageUrl == null ? urls[markUrl == null ? 1 : 0] : personImageUrl,
            },
        });
        return NextResponse.json(updatedRole, { status: 200 });
    } catch (error) {
        console.error("Error updating a role:", error);
        return NextResponse.json({ error: "Failed to update a role" }, { status: 500 });
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

        await prisma.role.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ message: "Deleted a role" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting a notification:", error);
        return NextResponse.json({ error: "Failed to delete a role" }, { status: 500 });
    }
}