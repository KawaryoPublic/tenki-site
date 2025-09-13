"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function RestrictedLink({ href, children, className, replace = false }: { href: string, children: React.ReactNode, className?: string, replace?: boolean }) {
    return (
        <Link href={`${href}?q=${useSearchParams().get("q")}`} className={className} replace={replace}>{children}</Link>
    )
}
