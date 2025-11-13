"use client";

import { redirect } from "next/navigation";
import { Box } from "@/lib/types";
import RedButton from "../../global/Button/RedButton";

export default function DeleteBoxButton({ updateBox }: { updateBox: Box }) {
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

                redirect(`/storage/${updateBox.tab}`);
            }}
        >
            削除
        </RedButton>
    );
}   