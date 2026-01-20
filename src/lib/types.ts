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

export interface Shelf {
    id: number;
    name: string;
    location: Location;
    size: number[];
    position: number[];
    equipment: {
        id: number;
        name: string;
        size: number[];
        position: number[]
    }[];
};

export interface Location {
    id: number;
    name: string;
    size: number[];
    equipment: Equipment[];
    shelves: Shelf[];
}

export interface Equipment {
    id: number;
    name: string;
    location: Location;
    number: number;
    size: number[];
    contents: string[];
    description: string;
    tags: string[];
    urls: string[];
    filenames: string[];
    updatedAt: Date;
}