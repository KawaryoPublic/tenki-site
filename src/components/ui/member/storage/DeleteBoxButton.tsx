"use client";

import RedButton from "../../global/button/RedButton";

export default function DeleteBoxButton({ boxId }: { boxId: number }) {
    return (
        <RedButton
            onClick={async () => {
                if (!confirm("本当に削除しますか？")) return;
                await fetch("/api/box", {
                    method: "DELETE",
                    body: JSON.stringify({
                        id: boxId
                    })
                }).then(() => window.location.href = "/storage")
                .catch(err => console.log(err));
            }}
        >
            削除
        </RedButton>
    );
}   