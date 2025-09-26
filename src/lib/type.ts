export enum TIER {
    NONE = "none",
    PARENT = "parent",
    STIDEMT = "student",
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

export interface NotificationType {
    id: number;
    title: string;
    content: string;
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