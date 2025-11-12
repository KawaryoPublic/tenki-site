"use client";

import RedButton from "../../global/Button/RedButton";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function DeleteFileButton({ id }: { id: number }) {
    const [ deleting, setDeleting ] = useState(false);

    return (
        <RedButton
            onClick={async () => {
                if(!confirm("本当に削除しますか？")) {
                    return;
                }

                setDeleting(true);
                
                await fetch(`/api/file?id=${id}`, {
                    method: 'DELETE',
                }).catch(err => console.log(err));

                setDeleting(false);

                redirect("/file");
            }}
            disabled={deleting}
        >
            {deleting ? "削除中..." : "削除"}
        </RedButton>
    );
}