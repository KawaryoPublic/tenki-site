"use client";

import FilterObservationForm from "@/components/ui/calendar/Form/FilterObservationForm";
import { DateInfo, TIER } from "@/lib/type";
import { useEffect, useState } from "react";
import { Observation } from "@/lib/type";
import CalendarUI from "@/components/ui/calendar/CalendarUI";

export default function CalendarSection({ filter, tier }: {filter: string, tier: TIER}) {
    const [observationDays, setObservationDays] = useState<Number[]>([]);
    const [dateInfo, setDateInfo] = useState<DateInfo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch('/api/date_info')
            .then(res => res.json())
            .then(data => setDateInfo(data))
            .then(() => {
                if (!filter) return;

                fetch(`/api/observation?filter=${filter}`)
                    .then(res => res.json())
                    .then(data => {
                        setObservationDays(
                            data.map((observation: Observation) => observation.day)
                        );
                    })
                    .finally(() => setLoading(false))
                    .catch(err => console.error(err));
            })
            .finally(() => setLoading(false))
            .catch(err => console.log(err));
    }, [filter]);

    return (
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !dateInfo ? <div className="flex-1 flex flex-col items-center font-bold text-xl">カレンダーを読み込めませんでした</div> :
        <section className="flex-1 flex flex-col gap-2">
            <div className="w-full flex justify-end">
                <FilterObservationForm filter={filter} />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 h-full">
                {
                    Array.from({ length: 3 }).map((_, i) => <CalendarUI key={i} index={i} tier={tier} filter={filter} dateInfo={dateInfo} observationDays={observationDays} />)
                }
            </div>
        </section>
    )
}