"use client";

import { Shelf } from "@/lib/types";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";

export default function SaveLocationButton({ id, shelves }: { id: number, shelves: Shelf[] }) {
    const pathname = usePathname();
    const [ saving, setSaving ] = useState(false);

    return (
        <button
            className="cursor-pointer hover:underline"
            onClick={async () => {/** 
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
                */
            }}
        >
            <span className="text-lg md:text-xl p-1 font-bold">保存</span>
            
        </button>
    );
}