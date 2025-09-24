"use client";

import { DAYS } from "@/lib/const";
import DayElement from "./DayElement";
import DateElement from "./DateElement";
import { DateInfo, TIER } from "@/lib/type";
import { useEffect, useState } from "react";
import { Observation } from "@/lib/type";

export default function Calendar({ index, tier, filter }: { index: number, tier: TIER, filter: string }) {
    const firstDate = new Date(new Date().getFullYear(), new Date().getMonth() + index, 1);
    const [observationDays, setObservationDays] = useState<Number[]>([]);
    const [dateInfo, setDateInfo] = useState<DateInfo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch('/api/dateInfo')
            .then(res => res.json())
            .then(data => setDateInfo(data))
            .then(() => {
                if (!filter) return;

                fetch("/api/observation")
                    .then(res => res.json())
                    .then(data => {
                        setObservationDays(
                            data.filter((observation: Observation) => observation.morning.includes(filter) || observation.noon.includes(filter) || observation.afterSchool.includes(filter))
                                .map((observation: Observation) => observation.day)
                        );
                    })
                    .catch(err => console.error(err));
            })
            .finally(() => setLoading(false))
            .catch(err => console.log(err));
    }, [filter]);

    return (
        loading ? <div className="text-lg">Loading...</div> :
        <div className="flex-1 flex flex-col min-h-[50%]" key={index}>
            <h2 className="flex justify-center item-center font-bold text-xl">{new Date().getMonth() + index + 1}月</h2>
            <div className="pt-3 pb-3 flex gap-2">
                {
                    DAYS.map((day, index) => <DayElement day={day} index={index} isObservationDay={observationDays.includes(index)} key={index} />)
                }
            </div>
            <div className="grid grid-cols-7 grid-rows-6 gap-2 h-full">
                {
                    Array.from({ length: 42 }, (_, i) => {       
                        const date = new Date(firstDate);
                        date.setDate(date.getDate() + i - firstDate.getDay());

                        return date;
                    }).map((date, index) => <DateElement date={date} info={dateInfo.find((d: DateInfo) => d.date === `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)} filter={filter} firstDate={firstDate} tier={tier} index={index} key={index} />)
                }
            </div>
        </div>
    )
}