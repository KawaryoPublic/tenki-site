import { Shelf } from "@/lib/types";
import WhiteFrameUI from "../../global/WhiteFrameUI";
import Link from "next/link";

export default function ShelfMapUI({ shelf, size }: { shelf: Shelf, size: number[] }) {
    return (
        <WhiteFrameUI
            style={{
                width: `${size[0] - 30}px`,
                height: `${size[1] - 30}px`
            }}
        >
            <div className="w-full h-full border-2 relative">
                {
                    shelf.equipment.map((equipment, i) => (
                        equipment.id === -1 ? 
                            <div
                                key={i}
                                className="absolute border bg-gray-300 text-center text-sm md:text-base overflow-hidden flex items-center justify-center"
                                style={{
                                    width: `${equipment.size[0] / shelf.size[0] * 100}%`,
                                    height: `${equipment.size[1] / shelf.size[1] * 100}%`,
                                    left: `${equipment.position[0] / shelf.size[0] * 100}%`,
                                    bottom: `${equipment.position[1] / shelf.size[1] * 100}%`,
                                }}
                            >
                                {equipment.name}
                            </div> :
                            <Link 
                                key={i}
                                href={`/equipment/${equipment.id}`}
                                className="absolute border bg-gray-300 text-center text-sm md:text-base overflow-hidden flex items-center justify-center hover:bg-gray-400"
                                style={{
                                    width: `${equipment.size[0] / shelf.size[0] * 100}%`,
                                    height: `${equipment.size[1] / shelf.size[1] * 100}%`,
                                    left: `${equipment.position[0] / shelf.size[0] * 100}%`,
                                    bottom: `${equipment.position[1] / shelf.size[1] * 100}%`,
                                }}
                            >
                                {equipment.name}
                            </Link>
                    ))
                }
            </div>
        </WhiteFrameUI>
    )
}