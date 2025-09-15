"use server";

import { cookies } from "next/headers";

export const getPassword = async () => {
    const cookieStore = await cookies();
    return cookieStore.get("password")?.value ?? "";
}