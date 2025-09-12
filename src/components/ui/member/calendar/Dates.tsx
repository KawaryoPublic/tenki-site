"use client";

import { DateInfo, Observation } from "@/lib/type";
import RestrictedLink from "@/components/ui/global/RestrictedLink";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AddDateInfoButton from "./AddDateInfoButton";
import DateElement from "./DateElement";

export default function Dates({ index }: { index: number }) {
    const firstDate = new Date(new Date().getFullYear(), new Date().getMonth() + index, 1);
    const filter = useSearchParams().get("filter");
    const [ dateInfo, setDateInfo ] = useState<DateInfo[]>([]);
    const [ observationDays, setObservationDays ] = useState<Number[]>([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        fetch('/api/dateInfo')
            .then(res => res.json())
            .then(data => setDateInfo(data))
            .finally(() => setLoading(false))
            .catch(err => console.log(err));

        if (!filter) return;

        fetch("/api/observation")
            .then(res => res.json())
            .then(data => {
                const observations = data.findAll((observation: Observation) => observation.morning === filter || observation.noon === filter || observation.afterSchool === filter);
                setObservationDays(observations.map((observation: Observation) => observation.day));
            })
            .catch(err => console.error(err));
    }, []);

    return (
        loading ? <div>Loading...</div> : 
        <div className="flex-1">
            <div className="grid grid-cols-7 grid-rows-6 gap-2 h-full">
            {
                Array.from({ length: 42 }, (_, i) => {
                    const date = new Date(firstDate);
                    date.setDate(date.getDate() + i - firstDate.getDay());

                    return date;
                }).map((date, index) => {
                    const info = dateInfo.find((d: DateInfo) => d.date === `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);

                    return (
                        <div 
                            key={index}
                            className={`
                                flex flex-col items-center justify-center rounded
                                ${date.getMonth() === firstDate.getMonth() ? '' : 'bg-gray-200 text-gray-100'}
                                ${date.toDateString() === new Date().toDateString() ? 'border-2 border-blue-500 font-bold' : ''}
                                ${filter && (observationDays.includes(date.getDay()) || (info && info.holiday.includes(filter))) ? 'bg-yellow-200' : ''}
                            `}
                        >
                            {
                                info ? 
                                <RestrictedLink href={`/calendar/${info.id}`} className="w-full h-full flex flex-col items-center justify-center bg-red-400">
                                    <DateElement date={date} info={info} />
                                </RestrictedLink> :
                                <AddDateInfoButton date={date} />
                            }
                        </div>
                    );
                })
            }
            </div>
        </div>
        
    )
}