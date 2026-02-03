import { Location } from "@/lib/types";
import { useEffect, useState, RefObject } from "react";
import WhiteFrameUI from "../../global/WhiteFrameUI";
import Link from "next/link";
import { fitToParentSize } from "@/lib/utils";

export default function LocationMapUI({ location, parentRef, className = "" }: { location: Location, parentRef: RefObject, className: string }) {
    const [ size, setSize ] = useState<number[]>([]);

    useEffect(() => {
        setSize(fitToParentSize(parentRef, 16, 32, location?.size[0] / location?.size[1]));
    }, [location]);

    return (
        <WhiteFrameUI className={`flex justify-center items-center left-[50%] transform-[translateX(-50%)] z-2 margin-auto absolute top-0 bottom-0 ${className}`}>
            <div className="border-2 relative" style={{
                width: `${size[0]}px`,
                height: `${size[1]}px`
            }}>
                {
                    location.shelves.map((shelf, i) => (
                        <Link 
                            key={i}
                            href={`/storage/shelf/${shelf.id}`}
                            className="absolute border bg-gray-300 text-center text-xs md:text-sm overflow-hidden flex items-center justify-center hover:bg-gray-400"
                            style={{
                                width: `${shelf.size[0] / location.size[0] * 100}%`,
                                height: `${shelf.size[1] / location.size[1] * 100}%`,
                                left: `${shelf.position[0] / location.size[0] * 100}%`,
                                bottom: `${shelf.position[1] / location.size[1] * 100}%`,
                            }}
                        >
                            {shelf.name}
                        </Link>
                    ))
                }
            </div>
        </WhiteFrameUI>
    );
}