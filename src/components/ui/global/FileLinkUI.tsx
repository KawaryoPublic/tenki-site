import Link from "next/link";

export default function FileLinkUI({ url, filename }: { url: string, filename: string }) {
    return (
        <Link href={url} target="_blank" className="border rounded-md px-2 py-2 md:py-4 overflow-hidden whitespace-nowrap">{filename}</Link>
    )
}