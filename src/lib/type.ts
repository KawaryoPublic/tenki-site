export interface Observation {
    day: number;
    morning: string;
    noon: string;
    afterSchool: string;
}

export interface DateInfo {
    id: number;
    date: string;
    plan: string;
    event: string;
    holiday: string;
}

export interface NotificationType {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
}

export interface Box {
    id: number;
    name: string;
    number: string;
    annotation: string;
    link: string;
    floor: number;
    top: number;
    left: number;
    width: number;
    height: number;
}