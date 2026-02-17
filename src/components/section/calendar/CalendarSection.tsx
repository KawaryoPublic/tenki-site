"use client";

import { DateInfo, Observation } from "@/lib/types";
import { useEffect, useState } from "react";
import CalendarUI from "@/components/ui/calendar/CalendarUI";
import DefaultSearchForm from "@/components/ui/global/Form/DefaultSearch";
import { redirect } from "next/navigation";

export default function CalendarSection({ filter, tier }: { filter: string, tier: number }) {
    const [observationDays, setObservationDays] = useState<Number[]>([]);
    const [dateInfo, setDateInfo] = useState<DateInfo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch('/api/calendar/date_info')
            .then(res => res.json())
            .then(data => setDateInfo(data))
            .then(() => {
                if (!filter) return;

                fetch(`/api/calendar/observation?filter=${filter}`)
                    .then(res => res.json())
                    .then(data => setObservationDays(
                        data.filter((observation: Observation) => observation.morning.includes(filter) || observation.noon.includes(filter) || observation.afterSchool.includes(filter))
                            .map((observation: Observation) => observation.day)))
                    .finally(() => setLoading(false))
                    .catch(err => console.error(err));
            })
            .finally(() => setLoading(filter))
            .catch(err => console.log(err));
    }, [filter]);

    return (
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !dateInfo || !observationDays ? <div className="flex-1 flex flex-col items-center font-bold text-xl">カレンダーを読み込めませんでした</div> :
        <section className="flex-1 flex flex-col gap-2">
            <div className="w-full flex justify-end">
                <DefaultSearchForm title="記号で観測シフトを検索" defaultValue={filter} search={searchString => redirect(`/calendar?filter=${searchString}`)} />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 h-full">
                {
                    Array.from({ length: 3 }).map((_, i) => <CalendarUI key={i} index={i} tier={tier} filter={filter} dateInfo={dateInfo} observationDays={observationDays} />)
                }
            </div>
        </section>
    )
}