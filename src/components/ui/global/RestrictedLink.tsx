"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function RestrictedLink({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) {
    return (
        <Link href={`${href}?q=${useSearchParams().get("q")}`} className={className}>{children}</Link>
    )
}
