"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

export default function DeleteFileButton({ id }: { id: number }) {
    const [ deleting, setDeleting ] = useState(false);

    return (
        <button
            className="cursor-pointer hover:underline"
            onClick={async () => {
                if(!confirm("本当に削除しますか？")) {
                    return;
                }

                setDeleting(true);
                
                await fetch(`/api/file?id=${id}`, {
                    method: 'DELETE',
                }).catch(err => {
                    console.log(err);
                    alert("削除に失敗しました。");
                });

                redirect("/file");
            }}
            disabled={deleting}
        >
            {deleting ? "削除中..." : "削除"}
        </button>
    );
}