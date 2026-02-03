"use client";

import { checkTier } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav({ href, title, tier, allowParent = false, allowStudent = false, allowAll = false}: { href: string, title: string, tier: number, allowParent?: boolean, allowStudent?: boolean, allowAll?: boolean }) {
    const pathname = usePathname();

    return (
        allowAll ? 
        <div>
            <Link href={href} className={`hover:bg-gray-400 ${pathname.split("/")[1] === href.split("/")[1] ? "border-b-3 font-bold" : ""}`}>{title}</Link>
        </div> :
        checkTier(tier, allowParent, allowStudent) ? 
        <Link href={href} className={`hover:bg-gray-400 ${pathname.split("/")[1] === href.split("/")[1] ? "border-b-3 font-bold" : ""}`}>{title}</Link> : ""
    );
}