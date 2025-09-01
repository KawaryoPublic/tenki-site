"use client";

import RedButton from "../global/button/RedButton";

export default function DeleteNotificationButton({ id }: { id: number }) {
    return (
        <RedButton
            onClick={async () => {
                confirm("本当に削除しますか？") &&
                await fetch('/api/notifications', {
                    method: 'DELETE',
                    body: JSON.stringify({
                        id: id,
                    }),
                }).then(() => alert("削除しました"))
                .then(() => window.location.reload())
                .catch(err => console.log(err));
            }}
        >
            删除
        </RedButton>
    );
}