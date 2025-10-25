"use client";

import RedButton from "@/components/ui/Button/RedButton";

export default function DeleteNotificationButton({ id }: { id: number }) {
    return (
        <RedButton
            onClick={async () => {
                confirm("本当に削除しますか？") &&
                await fetch('/api/notification', {
                    method: 'DELETE',
                    body: JSON.stringify({
                        id: id,
                    }),
                }).then(() => window.location.reload())
                .catch(err => console.log(err));
            }}

        >
            削除
        </RedButton>
    );
}