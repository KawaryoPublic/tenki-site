"use client";

import { DateInfo, Observation } from "@/lib/types";
import { useState, useEffect } from "react";
import { checkTier } from "@/lib/utils";
import DateInfoDetailUI from "@/components/ui/calendar/date_info/DateInfoDetailUI";
import BlueButton from "@/components/ui/global/Button/BlueButton";

export default function DateInfoDetailSection({ date, tier }: { date: string, tier: number }) {
    const splitDate = date.split("-");
    const [ info, setInfo ] = useState<DateInfo | null>();
    const [ observation, setObservation ] = useState<Observation | null>();
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        setLoading(true);
        
        fetch(`/api/calendar/date_info?date=${date}`)
            .then(res => res.json())
            .then(data => setInfo(data))
            .then(() => {
                fetch(`/api/calendar/observation?day=${new Date(Number(splitDate[0]), Number(splitDate[1]), Number(splitDate[2])).getDay()}`)
                    .then(res => res.json())
                    .then(data => setObservation(data))
                    .finally(() => setLoading(false))
            })
            .catch(err => console.error(err));
    }, []);

    return (
        checkTier(tier, false, true) &&
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !info ? <div className="flex-1 flex flex-col items-center font-bold text-xl">詳細を読み込めませんでした</div> :
        <section className="w-full flex flex-col gap-4">
            <DateInfoDetailUI info={info} observation={observation} tier={tier} />
            <div className="flex flex-col gap-4">
                <div className="z-2">
                    <BlueButton href="/calendar">日付一覧に戻る</BlueButton>
                </div>
            </div>
        </section>
    );
}