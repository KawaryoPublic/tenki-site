import { DateInfo } from "./type";

export function getDate(dates: DateInfo[], targetDate: string): DateInfo {
    const date = dates.find(d => d.date === targetDate);

    return date ? date : {date: targetDate, club: false, plan: ""};
}