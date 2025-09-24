"use server";

import { cookies } from "next/headers";
import { TIER } from "./type";

export const getTier = async () => {
    const cookieStore = await cookies();
    return cookieStore.get("tier")?.value as TIER ?? "";
}