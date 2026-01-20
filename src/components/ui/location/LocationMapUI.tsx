import { Location } from "@/lib/types";
import WhiteFrameUI from "../global/WhiteFrameUI";
import Link from "next/link";

export default function LocationMapUI({ location }: { location: Location }) {
    return (
        <WhiteFrameUI className="flex-1 flex flex-col gap-6">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl md:text-2xl font-bold">{location.name}の地図</h2>
            </div>
            <div className="flex-1 object-contain border-2 relative" style={{ aspectRatio: location.size[0] / location.size[1]}}>
                {
                    location.shelves.map((shelf, i) => (
                        <Link 
                            key={i}
                            href={`/storage/${location.id}/${shelf.id}`}
                            className="absolute border bg-gray-300 text-center text-sm md:text-base text-center overflow-hidden"
                            style={{
                                width: `${shelf.size[0] / location.size[0] * 100}%`,
                                height: `${shelf.size[1] / location.size[1] * 100}%`,
                                left: `${shelf.position[0] / location.size[0] * 100}%`,
                                top: `${shelf.position[1] / location.size[1] * 100}%`,
                            }}
                        >
                            {shelf.name}
                        </Link>
                    ))
                }
            </div>
        </WhiteFrameUI>
    )
}