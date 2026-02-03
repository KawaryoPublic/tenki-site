"use client";

import RedButton from "@/components/ui/global/Button/RedButton";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";

export default function DeleteShelfButton({ locationId, shelfId }: { locationId: number, shelfId: number }) {
    const pathname = usePathname();
    const [ deleting, setDeleting ] = useState(false);

    return (
        <RedButton
            onClick={async () => {
                if(!confirm("本当に削除しますか？")) {
                    return;
                }

                setDeleting(true);

                await fetch(`/api/storage/shelf?id=${shelfId}`, {
                    method: 'DELETE',
                }).catch(err => {
                    console.log(err);
                    alert('削除に失敗しました。');
                });
                
                if(pathname === `/storage/location/${locationId}/edit`) {
                    window.location.reload();
                } else {
                    redirect(`/storage/location/${locationId}`)
                }
            }}
        >
            {deleting ? "削除中..." : "削除"}
        </RedButton>
    );
}