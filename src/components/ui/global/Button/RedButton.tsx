import { ReactNode } from "react";
import Link from "next/link";

export default function RedButton({ children, onClick, href, type, className = "" }: { children: ReactNode, onClick?: () => void, href?: string, type?: "button" | "submit" | "reset" | undefined, className?: string }) {
    return (
        href ? 
        <Link href={href} className={`bg-red-500 text-white px-2 md:px-3 py-[1.5px] text-sm md:text-base rounded hover:bg-red-600 ${className}`}>{children}</Link> :
        <button onClick={onClick} type={type} className={`bg-red-500 text-white px-2 md:px-3 py-1 text-sm md:text-base rounded hover:bg-red-600 ${className}`}>{children}</button>
    );
}