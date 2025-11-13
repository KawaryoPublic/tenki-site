import Link from "next/link";

export default function FileLinkUI({ url, filename, className = "" }: { url: string, filename: string, className?: string }) {
    return (
        <Link href={url} target="_blank" className={`border rounded-md px-2 md:py-4 overflow-hidden whitespace-nowrap ${className}`}>{filename}</Link>
    )
}