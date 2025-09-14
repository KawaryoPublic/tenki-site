"use client";

import { redirect, useSearchParams } from "next/navigation";
import RedButton from "../../global/button/RedButton";
import { Box } from "@/lib/type";

export default function DeleteBoxButton({ q, updateBox }: { q: string, updateBox: Box }) {
    return (
        <RedButton
            onClick={async () => {
                if (!confirm("本当に削除しますか？")) return;
                await fetch("/api/box", {
                    method: "DELETE",
                    body: JSON.stringify({
                        id: updateBox.id
                    })
                }).catch(err => console.log(err));

                redirect(`/storage?q=${q}&floor=${updateBox.floor}`);
            }}
        >
            削除
        </RedButton>
    );
}   