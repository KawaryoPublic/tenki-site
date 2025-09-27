import Link from "next/link";

export default function RedButton({ children, onClick, href, className = "" }: { children: React.ReactNode, onClick?: () => void, href?: string, className?: string }) {
    return (
        href ? 
        <Link href={href} className={`bg-red-500 text-white px-2 md:px-3 py-2 text-sm md:text-base rounded hover:bg-red-600 ${className}`}>{children}</Link> :
        <button onClick={onClick} className={`bg-red-500 text-white px-2 md:px-3 py-1 text-sm md:text-base rounded hover:bg-red-600 ${className}`}>{children}</button>
    );
}