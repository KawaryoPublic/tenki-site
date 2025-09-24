"use server";

import { cookies } from "next/headers";

export const getTier = async () => {
    const cookieStore = await cookies();
    return cookieStore.get("tier")?.value ?? "";
}