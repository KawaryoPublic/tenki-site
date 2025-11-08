"use client";

import { DateInfo, TIER } from "@/lib/type";
import { useState, useEffect } from "react";
import { checkTier, formatDate } from "@/lib/util";
import DateInfoDetailUI from "@/components/ui/calendar/DateInfoDetailUI";
import BlueButton from "@/components/ui/global/Button/BlueButton";

export default function DateInfoDetailSection({ date, tier }: { date: string, tier: TIER }) {
    const [ info, setInfo ] = useState<DateInfo | null>();
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        fetch(`/api/date_info?date=${date}`)
            .then(res => res.json())
            .then(data => setInfo(data))
            .finally(() => setLoading(false))
            .catch(err => console.error(err));
    }, []);

    return (
        checkTier(tier, false, true) &&
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !info ? <div className="flex-1 flex flex-col items-center font-bold text-xl">詳細を読み込めませんでした</div> :
        <section className="w-full flex flex-col gap-4">
            <DateInfoDetailUI info={info} />
            <div className="flex flex-col gap-4">
                <div>
                    <BlueButton href="/calendar">日付一覧に戻る</BlueButton>
                </div>
            </div>
        </section>
    );
}