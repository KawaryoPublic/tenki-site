"use client";

import { redirect } from "next/navigation";
import RedButton from "../../../global/Button/RedButton";
import { useState } from "react";

export default function DeleteDateInfoButton({ date }: { date: string }) {
    const [ deleting, setDeleting ] = useState(false);

    return (
        <RedButton
            onClick={async () => {
                if(!confirm("本当に削除しますか？")) return;

                setDeleting(true);

                await fetch(`/api/calendar/date_info?date=${date}`, {
                    method: "DELETE",
                }).catch(err => {
                    console.log(err);
                    alert("削除に失敗しました。");
                });
                
                redirect(`/calendar`);
            }}
            disabled={deleting}
        >
            {deleting ? "削除中..." : "削除"}
        </RedButton>
    );
}