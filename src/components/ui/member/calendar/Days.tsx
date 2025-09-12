"use client";

import RestrictedLink from "../../global/RestrictedLink";
import { DAYS } from "@/lib/const";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Observation } from "@/lib/type";

export default function Days() {
    const filter = useSearchParams().get("filter");
    const [ observationDays, setObservationDays ] = useState<Number[]>([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
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
    }, []);

    return (
        loading ? <div>Loading...</div> :
        <div className="pt-3 pb-3 flex gap-2">
            {
                DAYS.map((day, index) => {
                    return (
                        index === 0 ?
                        <div 
                            key={index} 
                            className="w-full h-full font-bold flex items-center justify-center bg-gray-200 text-gray-600 rounded"
                        >
                            {day}
                        </div> :
                        <RestrictedLink 
                            key={index} 
                            className={`
                                w-full h-full font-bold flex items-center justify-center rounded
                                ${observationDays.includes(index) ? 'bg-yellow-200' : 'bg-white'}
                            `}
                            href={`/calendar/edit_observation/${index}`}
                        >
                            {day}
                        </RestrictedLink>
                    );
                })
            }
        </div>
    )
}