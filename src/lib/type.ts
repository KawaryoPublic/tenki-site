export interface DateInfo {
    id: number;
    date: string;
    plan?: string;
}

export interface NotificationType {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
}