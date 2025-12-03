export enum TIER {
    NONE = "none",
    PARENT = "parent",
    STUDENT = "student",
    ADMIN = "admin",
}

export interface Observation {
    day: number;
    morning: string[];
    noon: string[];
    afterSchool: string[];
}

export interface DateInfo {
    date: string;
    plan: string;
    holiday: string[];
}

export interface Notification {
    id: number;
    title: string;
    content: string;
    tags: string[];
    urls: string[];
    filenames: string[];
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

export interface File {
    id: number;
    title: string;
    url: string;
    tags: string[];
    tier: TIER;
    updatedAt: Date;
}

export interface Manual {
    id: number;
    title: string;
    content: string;
    tags: string[];
    urls: string[];
    filenames: string[];
    tier: string;
    updatedAt: Date;
}

export interface Equipment {
    id: number;
    name: string;
    description: string;
    location: string;
    tags: string[];
    urls: string[];
    filenames: string[];
    tier: string;
    updatedAt: Date;
}