"use client";

import RedButton from "@/components/ui/global/button/RedButton";
import { redirect } from "next/navigation";

export default function DeleteInfoButton({ id }: { id: number }) {
    return (
        <RedButton
            onClick={async () => {
                if(!confirm("本当に削除しますか？")) return;

                await fetch("/api/dateInfo", {
                    method: "DELETE",
                    body: JSON.stringify({ id: Number(id) }),
                }).catch(err => console.log(err));

                redirect(`/calendar`)
            }}
        >
            削除
        </RedButton>
    );
}