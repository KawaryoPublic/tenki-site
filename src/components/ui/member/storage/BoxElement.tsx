import { Box } from "@/lib/type";
import Link from "next/link";

export default function BoxElement({ box }: { box: Box }) {
    return (
        <div
            className="border text-sm absolute flex justify-center items-center"
            style={{
                width: `${box.width}%`,
                height: `${box.height}%`,
                top: `${box.top}%`,
                left: `${box.left}%`
            }}
        >
            <RestrictedLink href="/storage">
                {box.name}
            </RestrictedLink>
        </div>
    );
}