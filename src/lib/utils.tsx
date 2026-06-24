import { upload } from "@vercel/blob/client";
import { RefObject } from "react";
import { Equipment, EquipmentInstance, Location, Shelf } from "./types";
import { EQUIPMENT_PREFIXES } from "./const";

export const checkTier = (tier: number, allowParent: boolean = false, allowStudent: boolean = false) => {
    if(tier === 3) return true;
    if(allowParent) return tier === 1;
    if(allowStudent) return tier === 2;
    
    return false;
}

export const preventRefresh = () => {
    const preventRefresh = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        return (e.returnValue = '');
    };
    
    window.addEventListener('beforeunload', preventRefresh);
    return () => {
        window.removeEventListener('beforeunload', preventRefresh);
    }
}

export const formatDate = (date: string) => {
    const splitDate = date.split("-");

    if(splitDate[0] === new Date().getFullYear().toString()) {
        return `${Number(splitDate[1]) + 1}月${splitDate[2]}日`;
    }
    
    return `${splitDate[0]}年${Number(splitDate[1]) + 1}月${splitDate[2]}日`;
}

export const getEquipmentId = (equipment: Equipment) => {
    if(equipment.number === 999 || equipment.type === 4) return "";

    if(equipment.count === 1) return `${EQUIPMENT_PREFIXES[equipment.type]}-${equipment.number}`;

    return `${EQUIPMENT_PREFIXES[equipment.type]}-${equipment.number} ~ ${EQUIPMENT_PREFIXES[equipment.type]}-${equipment.number + equipment.count - 1}`;
}

export const getEquipmentCount = (location: Location, id: number, shelf?: Shelf, shelfEquipment?: { equipment: EquipmentInstance, state: "none" | "added" | "updated" | "deleted" }[]) => {
    let count = 0;
    location.shelves.forEach(s => {
        if(shelf != null && s.id === shelf.id) {
            (shelfEquipment || []).forEach(eq => {
                if (eq.state !== "deleted" && eq.equipment.id === id) {
                    count++;
                }
            });
            return;
        }

        s.equipment.forEach(eq => {
            if (eq.id === id) {
                count++;                
            }
        });
    });

    return count;
}

export const getDateId = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export const fitToParentSize = (parentRef: RefObject<HTMLElement | null>, aspectRatio: number) => {
    if(!parentRef.current) return [0, 0];

    const parentWidth = parentRef.current?.offsetWidth;
    const parentHeight = parentRef.current?.offsetHeight;

    return parentWidth / parentHeight < aspectRatio ? [parentWidth, parentWidth / aspectRatio] : [parentHeight * aspectRatio, parentHeight];
}

export const defaultFilter = (list: any[], tags: string[] = [], text?: { label: string, values: string[] }, selects: { label: string, value?: string | number }[] = [], checks: { label: string, value: boolean }[] = []) => {
    let filteredList = [...list];

    filteredList = tags.length === 0 ? filteredList : filteredList.filter(item => tags.every(tag => item["tags"].includes(tag)));

    filteredList = text?.values.length === 0 ? filteredList : filteredList.filter(item => text?.values.every(tag => item[text.label].includes(tag)));

    for(const select of selects) {
        filteredList = select.value == undefined ? filteredList : filteredList.filter(item => {
            if(Array.isArray(item[select.label])) return item[select.label].includes(select.value);

            return item[select.label] === select.value;
        });
    }

    for(const check of checks) {
        filteredList = check.value ? filteredList.filter(item => item[check.label]) : filteredList;
    }

    return filteredList;
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
            } else if(parts[parts.length -1]?.type !== "header" || part !== "\n") {
                parts.push({ type: "text", content: part });
            }
        })
    });

    return parts;
}

export const checkCollision = (size1: number[], position1: number[], size2: number[], position2: number[]) => {
    for(let i = 0; i < size1.length; i++) {
        if(position1[i] + size1[i] <= position2[i]) return false;
        if(position2[i] + size2[i] <= position1[i]) return false;
    }

    return true;
}

export const getEquipmentUnderShelf = (location: Location, thisShelf: Shelf) => {
    const shelves = [];

    for(const shelf of location.shelves) {
        if(shelf === thisShelf) continue;
        
        if(checkCollision(thisShelf.size, thisShelf.position, shelf.size, shelf.position)) {
            shelves.push(shelf);
        }
    }

    return shelves;
}

export const getEquipmentUnderEquipment = (shelf: Shelf, thisEquipment: EquipmentInstance) => {
    const equipment = [];

    for(const eq of shelf.equipment) {
        if(eq === thisEquipment || eq.height !== thisEquipment.height || eq.z > thisEquipment.z) continue;
        
        if(checkCollision(thisEquipment.size, thisEquipment.position, eq.size, eq.position)) {
            equipment.push(eq);
        }
    }

    return equipment;
}