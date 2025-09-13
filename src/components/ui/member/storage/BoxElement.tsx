import { Box } from "@/lib/type";
import RestrictedLink from "../../global/RestrictedLink";

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
            <RestrictedLink href="/storage" className="w-full h-full flex justify-center items-center" otherParams={`box=${box.id}`}>
                {box.name}
            </RestrictedLink>
        </div>
    );
}