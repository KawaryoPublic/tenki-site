"use client";

import { useEffect, useState } from "react";
import { Observation } from "@/lib/type";
import EditObservationForm from "@/components/ui/member/calendar/edit_observation/EditObservationForm";
import { DAYS, EXECUTIVE_PASSWORD } from "@/lib/const";
import WhiteFrame from "@/components/ui/global/WhiteFrame";
import BlueButton from "@/components/ui/global/button/BlueButton";
import { checkPassword } from "@/lib/util";
import Link from "next/link";

export default function EditObservationSection({ day, password }: { day: number, password: string }) {
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
                        day: Number(day)
                    }),
                }).then(res => res.json())
                .then(data => setObservation(data));
            })
            .catch(err => console.log(err));
    }, []);

    return (
        observation.day === -1 ? <div>Loading...</div> :
        <section>
            <h1 className="text-2xl">{DAYS[Number(day)]}曜日の観測</h1>
            <div className="flex flex-col gap-4">
                <div className="flex flex-1">
                    <WhiteFrame className="flex flex-col gap-2">
                        {
                            checkPassword(password) ?
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
                    </WhiteFrame> :
                </div>
                <div>
                    <BlueButton>
                        <Link href="/calendar">日付一覧に戻る</Link>
                    </BlueButton>
                </div>
            </div>
        </section>
    );
}