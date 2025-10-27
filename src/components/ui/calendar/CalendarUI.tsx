import { DAYS } from "@/lib/const";
import DayUI from "./DayUI";
import DateUI from "./DateUI";
import { DateInfo, TIER } from "@/lib/type";

export default function CalendarUI({ index, tier, filter, dateInfo, observationDays }: { index: number, tier: TIER, filter: string, dateInfo: DateInfo[], observationDays: Number[] }) {
    const firstDate = new Date(new Date().getFullYear(), new Date().getMonth() + index, 1);

    return (
        <div className="flex-1 flex flex-col min-h-[50%]" key={index}>
            <h2 className="flex justify-center item-center font-bold text-xl">{new Date().getMonth() + index + 1}月</h2>
            <div className="pt-3 pb-3 flex gap-2">
                {
                    DAYS.map((day, index) => <DayUI day={day} index={index} isObservationDay={observationDays.includes(index)} key={index} />)
                }
            </div>
            <div className="grid grid-cols-7 grid-rows-6 gap-2 h-full">
                {
                    Array.from({ length: 42 }, (_, i) => {       
                        const date = new Date(firstDate);
                        date.setDate(date.getDate() + i - firstDate.getDay());

                        return date;
                    }).map((date, index) => <DateUI date={date} info={dateInfo.find((d: DateInfo) => d.date === `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)} filter={filter} firstDate={firstDate} tier={tier} index={index} key={index} />)
                }
            </div>
        </div>
    )
}