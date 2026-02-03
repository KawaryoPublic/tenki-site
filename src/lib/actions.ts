"use server";

import { cookies } from "next/headers";
import { NextRequest } from "next/server"; 

export const getTier = async (request?: NextRequest) => {
    const cookieStore = request ? (await request.cookies) : (await cookies());
    return Number(cookieStore.get("tier")?.value) || 0;
}