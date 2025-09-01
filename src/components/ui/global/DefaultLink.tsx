"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function DefaultLink({ href, children, className, appendParams }: { href: string, children: React.ReactNode, className?: string, appendParams?: string }) {
    return (
        <Link href={`${href}?q=${useSearchParams().get("q")}${appendParams}`} className={className}>{children}</Link>
    )
}
