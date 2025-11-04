import { TIER } from "./type";
import { upload } from "@vercel/blob/client";

export const checkTier = (tier: TIER, allowParent: boolean = false, allowStudent: boolean = false) => {
    if(tier === TIER.ADMIN) return true;
    if(allowParent) return tier === TIER.PARENT;
    if(allowStudent) return tier === TIER.STUDENT;
    
    return false;
}

export const filterByTagsAndTitle = (list: any[], tags: string[], title: string) => {
    const filteredList = tags.length === 0 ? 
        [...list] :
        list.filter(item => 
            tags.every(tag => item.tags.includes(tag))
        );

    return title === "" ?
        filteredList :
        filteredList.filter(item => item.title.toLowerCase().includes(title.toLowerCase()));
}

export const uploadFiles = async (files: FileList | File[]) => {
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