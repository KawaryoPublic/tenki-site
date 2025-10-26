"use client";

import FilterObservationForm from "@/components/ui/calendar/Form/FilterObservationForm";
import { DateInfo, TIER } from "@/lib/type";
import { useEffect, useState } from "react";
import { Observation } from "@/lib/type";
import Calendar from "@/components/ui/calendar/CalendarUI";

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
            })
            .finally(() => setLoading(false))
            .catch(err => console.log(err));
    }, [filter]);

    return (
        loading ? <div className="text-lg">Loading...</div> :
        <section className="flex-1 flex flex-col gap-2">
            <div className="w-full flex justify-end">
                <FilterObservationForm />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 h-full">
                {
                    Array.from({ length: 3 }).map((_, i) => <Calendar key={i} index={i} tier={tier} filter={filter} dateInfo={dateInfo} observationDays={observationDays} />)
                }
            </div>
        </section>
    )
}