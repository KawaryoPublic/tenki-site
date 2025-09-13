"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function RestrictedLink({ href, children, className, otherParams }: { href: string, children: React.ReactNode, className?: string, otherParams?: string}) {
    return (
        <Link href={`${href}?q=${useSearchParams().get("q")}&${otherParams}`} className={className}>{children}</Link>
    )
}
