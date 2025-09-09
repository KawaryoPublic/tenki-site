"use client";

import { EXECUTIVE_PASSWORD } from "@/lib/const";
import { DateInfo } from "@/lib/type";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function AddPlanButton({ date, firstDate }: { date: Date, firstDate: Date }) {
    const [ dateInfo, setDateInfo ] = useState<DateInfo>({id: -1, date: ""});

    return (
        <button
            className={`
                flex items-center justify-center rounded 
                ${date.getMonth() === firstDate.getMonth() ? 'bg-white' : 'bg-gray-200 text-gray-400'}
                ${date.toDateString() === new Date().toDateString() ? 'border-2 border-blue-500 font-bold' : ''}
            `}
            onClick={async () => {
                if(!confirm("予定を追加しますか？") && useSearchParams().get("q") !== EXECUTIVE_PASSWORD) return;

                await fetch("/api/dateInfo", {
                    method: "POST",
                    body: JSON.stringify({
                        date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
                        plan: ""
                    }),
                }).then(res => res.json())
                .then(data => setDateInfo(data))
                .catch(err => console.log(err));

                redirect(`/calender/${dateInfo.id}`);
            }}
        >
            {date.getDate()}
        </button>
    )
}