"use client";

import { DateInfo } from "@/lib/type";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function AddPlanButton({ date }: { date: Date }) {
    const [ info, setInfo ] = useState<DateInfo>({id: -1, date: ""});

    return (
        <button
            className="w-full h-full"
            onClick={async () => {
                if(!confirm("予定を追加しますか？")) return;

                await fetch("/api/dateInfo", {
                    method: "POST",
                    body: JSON.stringify({
                        date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
                        plan: ""
                    }),
                }).then(() => alert("追加しました"))
                .catch(err => console.log(err));

                await fetch('/api/dateInfo')
                    .then(res => res.json())
                    .then(data => setInfo(data.find(info => info.date === `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)))
                    .catch(err => console.log(err));

                await redirect(`/calender/${info.id}`);
            }}
        />
    )
}