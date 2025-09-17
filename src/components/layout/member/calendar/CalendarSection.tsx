"use client";

import Days from "@/components/ui/member/calendar/Days";
import Dates from "@/components/ui/member/calendar/Dates";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Observation, DateInfo } from "@/lib/type";

export default function CalendarSection({ password }: { password: string }) {
    const searchParams = useSearchParams();
    const filter = searchParams.get("filter");
    const [ observationDays, setObservationDays ] = useState<Number[]>([]);
    const [ dateInfo, setDateInfo ] = useState<DateInfo[]>([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch('/api/dateInfo')
            .then(res => res.json())
            .then(data => setDateInfo(data))
            .then(() => {
                if (!filter) {
                    setObservationDays([]);
                    setLoading(false);
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
            })
            .catch(err => console.log(err));
    }, [searchParams]);


    return (
        loading ? <div className="text-lg">Loading...</div> :
        <section className="flex-1 flex flex-col lg:flex-row gap-4">
            {
                Array.from({ length: 3 }).map((_, i) => (
                    <div className="flex-1 flex flex-col min-h-[50%]" key={i}>
                        <h2 className="flex justify-center item-center font-bold text-xl">{new Date().getMonth() + i + 1}月</h2>
                        <Days observationDays={observationDays} />
                        <Dates index={i} filter={filter} dateInfo={dateInfo} password={password} />
                    </div>
                ))
            }
        </section>
        
    )
}