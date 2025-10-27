export enum TIER {
    NONE = "none",
    PARENT = "parent",
    STUDENT = "student",
    ADMIN = "admin",
}

export interface Observation {
    day: number;
    morning: string;
    noon: string;
    afterSchool: string;
}

export interface DateInfo {
    date: string;
    plan: string;
    event: string;
    holiday: string;
}

export interface Notification {
    id: number;
    title: string;
    content: string;
    tags?: string[];
    tier: string;
    updatedAt: Date;
}

export interface Box {
    id: number;
    name: string;
    content: string;
    imageLink: string;
    tab: number;
    top: number;
    left: number;
    width: number;
    height: number;
}

export enum FILE_CATEGORY {
    IMAGE = "image",
    VIDEO = "video",
    DOCUMENT = "document",
    LINK = "link",
    OTHER = "other",
}

export interface File {
    id: number;
    title: string;
    url: string;
    category: FILE_CATEGORY;
    tags: string[];
    tier: TIER;
    updatedAt: Date;
}