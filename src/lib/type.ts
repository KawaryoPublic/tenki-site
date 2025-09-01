export interface DateInfo {
    id: number;
    date: string;
    plan?: string;
}

export interface Notification {
    title: string;
    content: string;
    createdAt: Date;
}