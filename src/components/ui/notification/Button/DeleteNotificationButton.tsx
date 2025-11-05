"use client";

import RedButton from "../../global/Button/RedButton";

export default function DeleteNotificationButton({ id }: { id: number }) {
    return (
        <RedButton
            onClick={async () => {
                confirm("本当に削除しますか？") &&
                (await fetch(`/api/notification?id=${id}`, {
                    method: 'DELETE',
                }).then(() => window.location.reload())
                .catch(err => console.log(err)));
            }}
        >
            削除
        </RedButton>
    );
}