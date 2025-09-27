"use client";

import { checkTier } from "@/lib/util";
import { useEffect, useState } from "react";
import { Observation, TIER } from "@/lib/type";
import EditObservationForm from "@/components/feature/calendar/edit_observation/EditObservationForm";
import { DAYS} from "@/lib/const";
import WhiteFrame from "@/components/ui/WhiteFrame";
import BlueButton from "@/components/ui/Button/BlueButton";
import Link from "next/link";

export default function EditObservationSection({ day, tier }: { day: number, tier: TIER }) {
    const [observation, setObservation] = useState<Observation>({day: -1, morning: "", noon: "", afterSchool: ""});
    
    useEffect(() => {
        fetch("/api/observation")
            .then(res => res.json())
            .then(data => {
                const observation = data.find((obs: Observation) => obs.day === day);
                if (observation) {
                    setObservation(observation);
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
            <WhiteFrame>
                {
                    checkTier(tier) ?
                    <>
                        <h2 className="text-xl border-b">編集</h2>
                        <div>
                            <EditObservationForm observation={observation} />
                        </div>
                    </> :
                    <>
                        <h2 className="text-xl border-b">観測</h2>
                        <div>
                            <p className="font-bold">朝</p>
                            <p className="whitespace-pre-wrap">{observation.morning ? observation.morning : "なし"}</p>
                        </div>
                        <div>
                            <p className="font-bold">昼</p>
                            <p className="whitespace-pre-wrap">{observation.noon ? observation.noon : "なし"}</p>
                        </div>
                        <div>
                            <p className="font-bold">放課後</p>
                            <p className="whitespace-pre-wrap">{observation.afterSchool ? observation.afterSchool : "なし"}</p>
                        </div>
                    </>
                }
            </WhiteFrame>
            <div>
                <BlueButton>
                    <Link href="/calendar" className="w-full h-full">日付一覧に戻る</Link>
                </BlueButton>
            </div>
        </section>
    );
}