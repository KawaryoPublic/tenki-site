import { DateInfo } from "./type";

export function formatDate(date: Date): string {
    return `${date.getFullYear()}-${(date.getMonth())}-${date.getDate()}`;
}

export function getDate(dates: DateInfo[], targetDate: string): DateInfo {
    const date = dates.find(d => d.date === targetDate);

    return date ? date : {date: targetDate, club: false, plan: ""};
}