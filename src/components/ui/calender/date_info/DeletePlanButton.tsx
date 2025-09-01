"use client";

import RedButton from "../../global/button/RedButton";

export default function DeletePlanButton({ id }: { id: number }) {
    return (
        <RedButton
            onClick={async () => {
                if(!confirm("本当に削除しますか？")) return;

                await fetch("/api/dateInfo", {
                    method: "DELETE",
                    body: JSON.stringify({ id }),
                }).then(() => alert("削除しました"))
                .then(() => location.reload())
                .catch(err => console.log(err));
            }}
        >
            削除
        </RedButton>
    );
}