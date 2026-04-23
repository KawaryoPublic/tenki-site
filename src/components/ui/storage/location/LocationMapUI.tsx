import { Location } from "@/lib/types";
import { useEffect, useState, RefObject } from "react";
import WhiteFrameUI from "../../global/WhiteFrameUI";
import Link from "next/link";
import { fitToParentSize } from "@/lib/utils";

export default function LocationMapUI({ location, parentRef, className = "" }: { location: Location, parentRef: RefObject<HTMLElement | null>, className?: string }) {
    const [ size, setSize ] = useState<number[]>([]);

    useEffect(() => {
        setSize(fitToParentSize(parentRef, location?.size[0] / location?.size[1]));
    }, [location]);

    return (
        <WhiteFrameUI 
            className={`z-2 absolute top-[50%] transform-[translateY(-50%)]  ${className}`}
            style={{
                width: `${size[0]}px`,
                height: `${size[1]}px`
            }}
        >
            <div className="w-full h-full border-2 relative">
                {
                    location.shelves.map((shelf, i) => (
                        <div 
                            key={i}
                            className={`absolute border text-center text-xs md:text-sm overflow-hidden flex items-center justify-center ${shelf.type === 0 ? "bg-gray-300 hover:border-2" : shelf.type === 1 ? "bg-gray-200 hover:border-2" : "bg-gray-100"}`}
                            style={{
                                width: `${shelf.size[0] / location.size[0] * 100}%`,
                                height: `${shelf.size[1] / location.size[1] * 100}%`,
                                left: `${shelf.position[0] / location.size[0] * 100}%`,
                                bottom: `${shelf.position[1] / location.size[1] * 100}%`,
                            }}
                        >
                            {
                                shelf.type === 2 ? <span>{shelf.name}</span> :
                                <Link href={`/storage/shelf/${shelf.id}`} className="w-full h-full flex items-center justify-center">
                                    {shelf.name}
                                </Link>
                            }
                        </div>
                    ))
                }
            </div>
        </WhiteFrameUI>
    );
}