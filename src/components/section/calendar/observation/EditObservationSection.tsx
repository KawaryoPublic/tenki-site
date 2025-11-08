"use client";

import { checkTier } from "@/lib/util";
import { useEffect, useState } from "react";
import { Observation, TIER } from "@/lib/type";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import EditObservationForm from "@/components/ui/calendar/Form/EditObservationForm";

export default function EditObservationSection({ day, tier }: { day: number, tier: TIER }) {
    const [ observation, setObservation ] = useState<Observation | null>();
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        fetch(`/api/observation?day=${day}`)
            .then(res => res.json())
            .then(data => setObservation(data))
            .finally(() => setLoading(false))
            .catch(err => console.log(err));
    }, []);

    return (
        checkTier(tier, false, true) &&
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !observation ? <div className="flex-1 flex flex-col items-center font-bold text-xl">観測シフトを読み込めませんでした</div> :
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <EditObservationForm observation={observation} />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/calendar">日付一覧に戻る</BlueButton>
            </div>
        </section>
    );
}