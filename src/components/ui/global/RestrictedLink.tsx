"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function RestrictedLink({ href, children, className, onNavigate }: { href: string, children: React.ReactNode, className?: string, onNavigate: (e: any) => void }) {
    return (
        <Link href={`${href}?q=${useSearchParams().get("q")}`} className={className} onNavigate={e => onNavigate(e)}>{children}</Link>
    )
}
