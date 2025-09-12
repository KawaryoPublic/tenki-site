"use client";

import { EXECUTIVE_PASSWORD } from "@/lib/const";
import { useSearchParams } from "next/navigation";

export default function AddDateInfoButton({ date }: { date: Date }) {
    const searchParams = useSearchParams();

    return (
        <button
            className="w-full h-full flex flex-col items-center justify-center"
            onClick={async () => {
                if(searchParams.get("q") !== EXECUTIVE_PASSWORD) return;
                if(!confirm("予定を追加しますか？")) return;

                await fetch("/api/dateInfo", {
                    method: "POST",
                    body: JSON.stringify({
                        date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
                    }),
                }).then(() => window.location.reload())
                .catch(err => console.log(err));
            }}
        >
            {date.getDate()}
        </button>
    )
}