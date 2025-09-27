import Link from "next/link";

export default function RedButton({ children, onClick, href, className = "" }: { children: React.ReactNode, onClick?: () => void, href?: string, className?: string }) {
    return (
        href ? 
        <button className={`bg-red-500 text-white text-sm md:text-base rounded hover:bg-blue-600 ${className}`}>
            <Link href={href} className="px-2 md:px-3 py-1">{children}</Link>
        </button> :
        <button onClick={onClick} className={`bg-red-500 text-white px-2 md:px-3 py-1 text-sm md:text-base rounded hover:bg-red-600 ${className}`}>{children}</button>
    );
}