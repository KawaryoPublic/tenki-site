import { TIER } from "./type";
import { upload } from "@vercel/blob/client";

export const checkTier = (tier: TIER, allowParent: boolean = false, allowStudent: boolean = false) => {
    if(tier === TIER.ADMIN) return true;
    if(allowParent) return tier === TIER.PARENT;
    if(allowStudent) return tier === TIER.STUDENT;
    
    return false;
}

export const uploadFiles = async (files: File[]) => {
    const blobs = [];

    for (const file of files) {
        const blob = await upload(file.name, file, {
            access: 'public',
            handleUploadUrl: "/api/upload",
        });
        blobs.push(blob);
    }

    return blobs;
}