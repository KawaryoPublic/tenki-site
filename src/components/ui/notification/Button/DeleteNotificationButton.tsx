"use client";

import { redirect, usePathname } from "next/navigation";
import { useState } from "react";

export default function DeleteNotificationButton({ id, urls }: { id: number, urls: string[] }) {
    const pathname = usePathname();
    const [ deleting, setDeleting ] = useState(false);

    return (
        <button
            className="cursor-pointer hover:underline"
            onClick={async () => {
                if(!confirm("本当に削除しますか？")) {
                    return;
                }

                setDeleting(true);

                await fetch(`/api/notification?id=${id}`, {
                    method: 'DELETE',
                    body: JSON.stringify({ urls: urls }),
                }).catch(err => {
                    console.log(err);
                    alert('削除に失敗しました。');
                });
                
                if(pathname.startsWith('/notification')) {
                    redirect('/notification');
                    return;
                }

                window.location.reload();
            }}
        >
            {deleting ? "削除中..." : "削除"}
        </button>
    );
}