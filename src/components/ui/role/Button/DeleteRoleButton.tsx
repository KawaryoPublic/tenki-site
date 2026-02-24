"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

export default function DeleteRoleButton({ id, urls }: { id: number, urls: string[] }) {
    const [ deleting, setDeleting ] = useState(false);

    return (
        <button
            className="hover:underline"
            onClick={async () => {
                if(!confirm("本当に削除しますか？")) {
                    return;
                }

                setDeleting(true);

                await fetch(`/api/role?id=${id}`, {
                    method: 'DELETE',
                    body: JSON.stringify({ urls: urls }),
                }).catch(err => {
                    console.log(err);
                    alert('削除に失敗しました。');
                });

                redirect('/role');
            }}
        >
            {deleting ? "削除中..." : "削除"}
        </button>
    );
}