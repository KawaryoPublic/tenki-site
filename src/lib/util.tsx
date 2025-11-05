import { TIER } from "./type";
import { upload } from "@vercel/blob/client";
import { redirect } from "next/navigation";

export const checkTier = (tier: TIER, allowParent: boolean = false, allowStudent: boolean = false) => {
    if(tier === TIER.ADMIN) return true;
    if(allowParent) return tier === TIER.PARENT;
    if(allowStudent) return tier === TIER.STUDENT;
    
    return false;
}

export const filterByTagsAndTitle = (list: any[], tags: string[], title: string[]) => {
    const filteredList = tags.length === 0 ? 
        [...list] :
        list.filter(item => tags.every(tag => item.tags.includes(tag)));

    return title.length === 0 ?
        filteredList :
        filteredList.filter(item => title.every(title => item.title.includes(title)));
}

export const searchByTagsAndTitle = (url: string, searchString: string) => {
    const tags = [];
    const title = [];

    const parts = searchString.split(" ");
    for (const part of parts) {
        if (part.startsWith("#")) {
            tags.push(part.substring(1));
        } else {
            title.push(part);
        }
    }

    let redirectUrl = url;

    if(tags.length !== 0) {
        redirectUrl += `?tags=${tags.join(",")}`;
    }

    if(title.length !== 0) {
        redirectUrl += (tags.length !== 0 ? "&" : "?") + `title=${title.join(",")}`;
    }

    redirect(redirectUrl);
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