"use client";

import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function DeletePlanButton({ id }: { id: number }) {
    return (
        <button
            onClick={async () => {
                if(!confirm("本当に削除しますか？")) return;

                await fetch("/api/dateInfo", {
                    method: "DELETE",
                    body: JSON.stringify({ id }),
                }).then(() => alert("削除しました"))
                .catch(err => console.log(err));

                await redirect(`/calender?q=${useSearchParams().get("q")}`);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
        >
            削除
        </button>
    );
}