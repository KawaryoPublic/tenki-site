"use server";

import { cookies } from "next/headers";
import { NextRequest } from "next/server"; 
import { TIER } from "./type";

export const getTier = async (request?: NextRequest) => {
    const cookieStore = request ? (await request.cookies) : (await cookies());
    return cookieStore.get("tier")?.value as TIER || TIER.NONE;
}