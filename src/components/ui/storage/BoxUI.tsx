import { Box } from "@/lib/types";
import Link from "next/link";

export default function BoxUI({ box, tab }: { box: Box, tab: number }) {
    return (
        <div
            className="border text-sm absolute flex justify-center items-center bg-gray-200 hover:bg-gray-300"
            style={{
                width: `${box.width}%`,
                height: `${box.height}%`,
                top: `${box.top}%`,
                left: `${box.left}%`
            }}
        >
            <Link href={`/storage/${tab}?box=${box.id}`} className="w-full h-full flex justify-center items-center whitespace-nowrap overflow-x-auto">
                {box.name}
            </Link>
        </div>
    );
}