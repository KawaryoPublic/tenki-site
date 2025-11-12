"use client";

import RedButton from "../../global/Button/RedButton";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function DeleteNotificationButton({ id, urls }: { id: number, urls: string[] }) {
    const [ deleting, setDeleting ] = useState(false);

    return (
        <RedButton
            onClick={async () => {
                if(!confirm("本当に削除しますか？")) {
                    return;
                }

                setDeleting(true);

                await fetch(`/api/notification?id=${id}`, {
                    method: 'DELETE',
                    body: JSON.stringify({ urls: urls }),
                }).catch(err => console.log(err));

                setDeleting(false);

                redirect('/notification');
            }}
        >
            {deleting ? "削除中..." : "削除"}
        </RedButton>
    );
}