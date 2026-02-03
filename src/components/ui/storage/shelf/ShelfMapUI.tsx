import { Shelf } from "@/lib/types";
import WhiteFrameUI from "../../global/WhiteFrameUI";
import Link from "next/link";

export default function ShelfMapUI({ shelf }: { shelf: Shelf }) {
    return (
        <WhiteFrameUI className="flex-1 flex flex-col gap-6">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl md:text-2xl font-bold">{shelf.name}の地図</h2>
            </div>
            <div className="flex-1 object-contain border-2 relative" style={{ aspectRatio: shelf.size[0] / shelf.size[1]}}>
                {
                    shelf.equipment.map((equipment, i) => (
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