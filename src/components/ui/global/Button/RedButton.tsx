import { ReactNode } from "react";
import Link from "next/link";

export default function RedButton({ children, onClick, href, type, disabled = false, className = "" }: { children: ReactNode, onClick?: () => void, href?: string, type?: "button" | "submit" | "reset" | undefined, disabled?: boolean, className?: string }) {
    return (
        href ? 
        <Link href={href} className={`bg-red-500 hover:bg-red-600 focus:outline-2 focus:outline-offset-2 focus:outline-red-600 text-white px-2 md:px-3 py-[1.5px] text-sm md:text-base rounded hover:bg-red-600 ${className}`}>{children}</Link> :
        <button onClick={onClick} type={type} disabled={disabled} className={`bg-red-500 hover:bg-red-600 focus:outline-2 focus:outline-offset-2 focus:outline-red-600 disabled:bg-red-600 text-white disabled:text-gray-200 px-2 md:px-3 py-1 text-sm md:text-base rounded hover:bg-red-600 ${className}`}>{children}</button>
    );
}