"use server";

import { cookies } from "next/headers";
import { put } from "@vercel/blob";
import { TIER } from "./type";

export const getTier = async () => {
    const cookieStore = await cookies();
    return cookieStore.get("tier")?.value as TIER ?? TIER.NONE;
}

export const uploadFiles = async (files: File[]) => {
    const blobs = [];

    for (const file of files) {
        const blob = await put(file.name, file, {
            access: 'public',
        });
        blobs.push(blob);
    }

    return blobs;
}