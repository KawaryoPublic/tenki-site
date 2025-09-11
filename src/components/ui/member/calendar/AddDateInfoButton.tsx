"use client";

import { EXECUTIVE_PASSWORD } from "@/lib/const";
import { useSearchParams } from "next/navigation";

export default function AddDateInfoButton({ date, firstDate }: { date: Date, firstDate: Date }) {
    return (
        <button
            className="w-full h-full text-center"
            onClick={async () => {
                if(useSearchParams().get("q") !== EXECUTIVE_PASSWORD) return;
                if(!confirm("予定を追加しますか？")) return;

                await fetch("/api/dateInfo", {
                    method: "POST",
                    body: JSON.stringify({
                        date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
                        plan: ""
                    }),
                }).then(() => window.location.reload())
                .catch(err => console.log(err));
            }}
        >
            {date.getDate()}
        </button>
    )
}