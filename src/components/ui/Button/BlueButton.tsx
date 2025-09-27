import Link from "next/link";

export default function BlueButton({ children, onClick, href, className = "" }: { children: React.ReactNode, onClick?: () => void, href?: string, className?: string }) {
    return (
        href ? 
        <Link href={href} className={`bg-blue-500 text-white px-2 md:px-3 py-5 text-sm md:text-base rounded hover:bg-blue-600 ${className}`}>{children}</Link> :
        <button onClick={onClick} className={`bg-blue-500 text-white px-2 md:px-3 py-1 text-sm md:text-base rounded hover:bg-blue-600 ${className}`}>{children}</button>
    );
}