"use client";

import { useSearchParams } from "next/navigation";

export default function RestrictedContent({ allowParent, allowStudent, children }: { allowParent?: boolean, allowStudent?: boolean, children: React.ReactNode }) {
    const password = useSearchParams().get("q");

    const studentPassword = "student";
    const parentPassword = "parent";
    const executivePassword = "executive";

    return (
        password === executivePassword ? children :
        allowParent && password === parentPassword ? children :
        allowStudent && password === studentPassword ? children : <></>
    )
}