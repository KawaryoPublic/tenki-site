"use client";

import RedButton from "../../global/Button/RedButton";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function DeleteRoleButton({ id }: { id: number }) {
    const [ deleting, setDeleting ] = useState(false);

    return (
        <RedButton
            onClick={async () => {
                redirect('/role');
            }}
        >
            {deleting ? "削除中..." : "削除"}
        </RedButton>
    );
}