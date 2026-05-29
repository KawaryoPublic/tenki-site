import { Shelf } from "@/lib/types";
import WhiteFrameUI from "../../global/WhiteFrameUI";
import Link from "next/link";

export default function ShelfMapUI({ shelf, size, height }: { shelf: Shelf, size: number[], height: number }) {
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
                            equipment.height === height && (
                                <div
                                    key={i}
                                    className="absolute border bg-gray-200 text-center text-sm md:text-base overflow-hidden flex items-center justify-center hover:z-2"
                                    style={{
                                        width: `${equipment.size[0] / shelf.size[0] * 100}%`,
                                        height: `${equipment.size[1] / shelf.size[1] * 100}%`,
                                        left: `${equipment.position[0] / shelf.size[0] * 100}%`,
                                        bottom: `${equipment.position[1] / shelf.size[1] * 100}%`,
                                        zIndex: equipment.z,
                                    }}
                                >
                                    {equipment.name}
                                </div>
                            ) :
                            equipment.height === height && (
                                <Link 
                                    key={i}
                                    href={`/equipment/${equipment.id}`}
                                    className="absolute border bg-gray-300 text-center text-sm md:text-base overflow-hidden flex items-center justify-center hover:border-2 hover:z-2"
                                    style={{
                                        width: `${equipment.size[0] / shelf.size[0] * 100}%`,
                                        height: `${equipment.size[1] / shelf.size[1] * 100}%`,
                                        left: `${equipment.position[0] / shelf.size[0] * 100}%`,
                                        bottom: `${equipment.position[1] / shelf.size[1] * 100}%`,
                                        zIndex: equipment.z,
                                    }}
                                >
                                    {equipment.name}
                                </Link>
                            )
                    ))
                }
            </div>
        </WhiteFrameUI>
    )
}