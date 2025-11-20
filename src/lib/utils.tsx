import { TIER } from "./types";
import { upload } from "@vercel/blob/client";
import { redirect } from "next/navigation";

export const checkTier = (tier: TIER, allowParent: boolean = false, allowStudent: boolean = false) => {
    if(tier === TIER.ADMIN) return true;
    if(allowParent) return tier === TIER.PARENT;
    if(allowStudent) return tier === TIER.STUDENT;
    
    return false;
}

export const formatDate = (date: string) => {
    const splitDate = date.split("-");

    if(splitDate[0] === new Date().getFullYear().toString()) {
        return `${Number(splitDate[1]) + 1}月${splitDate[2]}日`;
    }
    
    return `${splitDate[0]}年${Number(splitDate[1]) + 1}月${splitDate[2]}日`;
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

    const parts = searchString.trim().split(/\s+/g);
    for (const part of parts) {
        if (part.startsWith("#")) {
            const tag = part.substring(1);
            if(tag) tags.push(tag);
        } else {
            if(part) title.push(part);
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

export const uploadFiles = async (formData: FormData) => {
    for (const file of formData.getAll('file') as File[]) {
        const blob = await upload(file.name, file, {
            access: 'public',
            handleUploadUrl: "/api/upload",
            multipart: true,
        });
        
        formData.append('url', blob.url);
        formData.append('filename', file.name);
    }
    
    formData.delete('file');

    return formData;
}

export const splitLinksAndHeaders = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s+]+)/g;
    const parts: { type: "link" | "header" | "text", content: string }[] = [];

    text.split(urlRegex).map(part => {
        if(urlRegex.test(part)) {
            parts.push({ type: "link", content: part });
            return;
        } 

        part.split(/(\n)/).map(part => {
            if(part.trim().startsWith("$h")) {
                parts.push({ type: "header", content: part.trim().slice(2) });
            } else if(parts[parts.length -1].type !== "header" || part !== "\n") {
                parts.push({ type: "text", content: part });
            }
        })
    });

    return parts;
}