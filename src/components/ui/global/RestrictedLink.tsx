"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function RestrictedLink({ href, children, className, otherParams }: { href: string, children: React.ReactNode, className?: string, otherParams?: string }) {
    const q = useSearchParams().get("q");
    return (
        <Link href={`${href}?q=${q}${otherParams ? "&" + otherParams : ""}`} className={className}>{children}</Link>
    )
}
