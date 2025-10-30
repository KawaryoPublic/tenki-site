"use client";

import { checkTier } from "@/lib/util";
import { useEffect, useState } from "react";
import { Observation, TIER } from "@/lib/type";
import EditObservationForm from "@/components/ui/calendar/Form/EditObservationForm";
import { DAYS } from "@/lib/const";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import ObservationDetailUI from "@/components/ui/calendar/ObservationDetailUI";

export default function EditObservationSection({ day, tier }: { day: number, tier: TIER }) {
    const [observation, setObservation] = useState<Observation>({day: -1, morning: "", noon: "", afterSchool: ""});
    
    useEffect(() => {
        fetch(`/api/observation?day=${day}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setObservation(data);
                    return;
                } 

                fetch("/api/observation", {
                    method: "POST",
                    body: JSON.stringify({
                        day: day,
                    }),
                }).then(res => res.json())
                .then(data => setObservation(data));
            })
            .catch(err => console.log(err));
    }, []);

    return (
        checkTier(tier) &&
        observation.day === -1 ? <div>Loading...</div> :
        <section className="w-full flex flex-col gap-4">
            <h1 className="text-2xl">{DAYS[day]}曜日の観測</h1>
            {
                checkTier(tier) ? 
                    <WhiteFrameUI>
                        <h2 className="text-xl border-b">編集</h2>
                        <div>
                            <EditObservationForm observation={observation} />
                        </div>
                    </WhiteFrameUI> :
                    <ObservationDetailUI observation={observation} />
            }
            <div>
                <BlueButton href="/calendar">日付一覧に戻る</BlueButton>
            </div>
        </section>
    );
}