"use client";

import RedButton from "../../global/Button/RedButton";
import { redirect } from "next/navigation";

export default function DeleteNotificationButton({ id, urls }: { id: number, urls: string[] }) {
    return (
        <RedButton
            onClick={async () => {
                if(!confirm("本当に削除しますか？")) {
                    return;
                }

                await fetch(`/api/notification?id=${id}`, {
                    method: 'DELETE',
                    body: JSON.stringify({ urls: urls }),
                }).catch(err => console.log(err));

                redirect('/notification');
            }}
        >
            削除
        </RedButton>
    );
}