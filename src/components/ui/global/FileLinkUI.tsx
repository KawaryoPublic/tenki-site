import Link from "next/link";

export default function OptionLinkUI({ url, label, className = "" }: { url: string, label: string, className?: string }) {
    return (
        <Link href={url} target="_blank" rel="noopener noreferrer" className={`border rounded-md px-2 py-1 overflow-hidden whitespace-nowrap ${className}`}>{label}</Link>
    )
}