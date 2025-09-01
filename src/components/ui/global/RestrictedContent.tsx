"use client";

import { useSearchParams } from "next/navigation";

export default function RestrictedContent({ allowParent, allowStudent, className, children }: { allowParent?: boolean, allowStudent?: boolean, className?: string, children: React.ReactNode }) {
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