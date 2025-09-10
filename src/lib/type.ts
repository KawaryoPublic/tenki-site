export interface Observation {
    morning: string;
    noon: string;
    afterSchool: string;
}

export interface DateInfo {
    id: number;
    date: string;
    plan?: string;
    observation?: Observation;
}

export interface NotificationType {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
}