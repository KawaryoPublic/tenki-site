import { ReactNode } from "react";
import Link from "next/link";

export default function BlueButton({ children, onClick, href, type, disabled = false, className = "" }: { children: ReactNode, onClick?: () => void, href?: string, type?: "button" | "submit" | "reset" | undefined, disabled?: boolean, className?: string }) {
    return (
        href ? 
        <Link href={href} className={`bg-blue-500 hover:bg-blue-600 focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 text-white px-2 md:px-3 py-1 text-sm md:text-base rounded ${className}`}>{children}</Link> :
        <button onClick={onClick} type={type} disabled={disabled} className={`bg-blue-500 hover:bg-blue-600 focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 disabled:bg-blue-600 text-white disabled:text-gray-300 px-2 md:px-3 py-1 text-sm md:text-base rounded hover:bg-blue-600 ${className}`}>{children}</button>
    );
}