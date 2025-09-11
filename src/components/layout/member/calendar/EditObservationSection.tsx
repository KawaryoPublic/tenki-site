"use client";

import { useEffect, useState } from "react";
import { Observation } from "@/lib/type";
import EditObservationForm from "@/components/ui/member/calendar/edit_observation/EditObservationForm";
import { DAYS } from "@/lib/const";

export default function EditObservationSection({ day }: { day: number }) {
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
                        morning: "",
                        noon: "",
                        afterSchool: "",
                    }),
                }).then(res => res.json())
                .then(data => setObservation(data));
            })
            .catch(err => console.log(err));
    });

    return (
        observation.day === -1 ? <div>Loading...</div> :
        <section>
            <h1 className="text-2xl">{DAYS[Number(day)]}曜日の観測</h1>
            <div className="flex flex-row">
                <div className="flex flex-1 flex-col gap-4">
                    <WhiteFrame className="flex flex-col gap-2">
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
                    </WhiteFrame>
                    <RestrictedContent>
                        <WhiteFrame className="flex flex-col gap-2">
                            <h2 className="text-xl border-b">編集</h2>
                            <div>
                                <EditObservationForm observation={observation} />
                            </div>
                        </WhiteFrame>
                    </RestrictedContent>
                </div>
            </div>
        </section>
    );
}