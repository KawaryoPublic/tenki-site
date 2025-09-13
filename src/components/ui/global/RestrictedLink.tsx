"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function RestrictedLink({ href, children, otherParams, className }: { href: string, children: React.ReactNode, otherParams?: string, className?: string }) {
    return (
        <Link href={`${href}?q=${useSearchParams().get("q")}&${otherParams}`} className={className}>{children}</Link>
    )
}
