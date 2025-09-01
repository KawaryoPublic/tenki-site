export interface DateInfo {
    id: number;
    date: string;
    plan?: string;
}

export interface NotificationType {
    title: string;
    content: string;
    createdAt: Date;
}