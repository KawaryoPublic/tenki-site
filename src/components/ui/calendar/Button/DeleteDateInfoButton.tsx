"use client";

import { redirect } from "next/navigation";
import RedButton from "../../global/Button/RedButton";
import { useState } from "react";

export default function DeleteDateInfoButton({ date }: { date: string }) {
    const [ deleting, setDeleting ] = useState(false);

    return (
        <RedButton
            onClick={async () => {
                if(!confirm("本当に削除しますか？")) return;

                setDeleting(true);

                await fetch(`/api/date_info?date=${date}`, {
                    method: "DELETE",
                }).finally(() => setDeleting(false))
                .catch(err => console.log(err));
                
                redirect(`/calendar`);
            }}
            disabled={deleting}
        >
            {deleting ? "削除中..." : "削除"}
        </RedButton>
    );
}