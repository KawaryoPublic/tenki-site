"use client";

import { EXECUTIVE_PASSWORD, PARENT_PASSWORD, STUDENT_PASSWORD } from "@/lib/const";
import { useSearchParams } from "next/navigation";

export default function RestrictedContent({ allowParent, allowStudent, children }: { allowParent?: boolean, allowStudent?: boolean, children: React.ReactNode}) {
    const password = useSearchParams().get("q");

    return (
        password === EXECUTIVE_PASSWORD ? children :
        allowParent && password === PARENT_PASSWORD ? children :
        allowStudent && password === STUDENT_PASSWORD ? children : <></>
    )
}