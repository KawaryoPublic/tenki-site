"use client";

import { checkTier } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Observation } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import ObservationDetailUI from "@/components/ui/calendar/observation/ObservationDetailUI";
import LoadingResultUI from "@/components/ui/global/LoadingResultUI";

export default function ObservationDetailSection({ day, tier }: { day: number, tier: number }) {
    const [ observation, setObservation ] = useState<Observation | null>();
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        setLoading(true);

        fetch(`/api/calendar/observation?day=${day}`)
            .then(res => res.json())
            .then(data => setObservation(data))
            .finally(() => setLoading(false))
            .catch(err => console.log(err));
    }, []);

    return (
        checkTier(tier, false, true) &&
        loading ? <LoadingResultUI>Loading...</LoadingResultUI> :
        !observation ? <LoadingResultUI>観測シフトを読み込めませんでした</LoadingResultUI> :
        <section className="w-full flex flex-col gap-4">
            <ObservationDetailUI observation={observation} tier={tier} />
            <div className="z-2">
                <BlueButton href="/calendar">日付一覧に戻る</BlueButton>
            </div>
        </section>
    );
}