"use client";

import { TIER } from "@/lib/type";
import { checkTier } from "@/lib/util";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav({ href, title, tier, allowParent = false, allowStudent = false, allowAll = false}: { href: string, title: string, tier: TIER, allowParent?: boolean, allowStudent?: boolean, allowAll?: boolean }) {
    const pathname = usePathname();

    return (
        allowAll ? 
        <div>
            <Link href={href} className={`hover:bg-gray-400 ${href.includes(pathname) ? "border-b-3 font-bold" : ""}`}>{title}</Link>
        </div> :
        checkTier(tier, allowParent, allowStudent) ? 
        <Link href={href} className={`hover:bg-gray-400 ${href.includes(pathname) ? "border-b-3 font-bold" : ""}`}>{title}</Link> : ""
    );
}