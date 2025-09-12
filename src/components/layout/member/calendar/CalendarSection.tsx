"use client";

import Days from "@/components/ui/member/calendar/Days";
import Dates from "@/components/ui/member/calendar/Dates";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Observation, DateInfo } from "@/lib/type";

export default function CalendarSection({ index }: { index: number }) {
    const filter = useSearchParams().get("filter");
    const [ observationDays, setObservationDays ] = useState<Number[]>([]);
    const [ dateInfo, setDateInfo ] = useState<DateInfo[]>([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        fetch('/api/dateInfo')
            .then(res => res.json())
            .then(data => setDateInfo(data))
            .finally(() => setLoading(false))
            .catch(err => console.log(err));

        if (!filter) {
            setLoading(false)
            return;
        }
    
        fetch("/api/observation")
            .then(res => res.json())
            .then(data => {
                setObservationDays(
                    data.filter((observation: Observation) => observation.morning.includes(filter) || observation.noon.includes(filter) || observation.afterSchool.includes(filter))
                    .map((observation: Observation) => observation.day)
                );
            })
            .finally(() => setLoading(false))
            .catch(err => console.error(err));
    }, []);


    return (
        loading ? <div>Loading...</div> :
        <section className="flex-1 flex flex-col min-h-[50%]">
            <h2 className="flex justify-center item-center font-bold text-xl">{new Date().getMonth() + index + 1}月</h2>
            <Days filter={filter} observationDays={observationDays} />
            <Dates index={index} filter={filter} dateInfo={dateInfo} />
        </section>
    )
}