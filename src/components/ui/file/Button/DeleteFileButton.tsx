"use client";

import RedButton from "../../global/Button/RedButton";

export default function DeleteFileButton({ id }: { id: number }) {
    return (
        <RedButton
            onClick={async () => {
                confirm("本当に削除しますか？") &&
                await fetch('/api/files', {
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