import { Shelf } from "@/lib/types";
import WhiteFrameUI from "../../global/WhiteFrameUI";
import Link from "next/link";
import { getEquipmentUnderEquipment } from "@/lib/utils";

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
                        equipment.height === height && (
                            <div 
                                key={i}
                                className={`group absolute border text-center text-xs md:text-sm flex items-center justify-center ${equipment.id === -1 ? "bg-gray-200" : "bg-gray-300 hover:border-2"}`}
                                style={{
                                    width: `${equipment.size[0] / shelf.size[0] * 100}%`,
                                    height: `${equipment.size[1] / shelf.size[1] * 100}%`,
                                    left: `${equipment.position[0] / shelf.size[0] * 100}%`,
                                    bottom: `${equipment.position[1] / shelf.size[1] * 100}%`,
                                    zIndex: equipment.z,
                                }} 
                            >
                                { 
                                        <div>
                                            {
                                                getEquipmentUnderEquipment(shelf, equipment).length > 0 && 
                                                <div 
                                                    className="z-1002 absolute hidden group-hover:block text-gray-900 bg-white rounded-lg shadow-md p-2 md:p-4 whitespace-nowrap"
                                                    style={{
                                                        left: `${equipment.position[0] / shelf.size[0] * 100}%`,
                                                        bottom: `${(equipment.position[1] + equipment.size[1]) / shelf.size[1] * 100}%`,
                                                    }}
                                                >
                                                    {getEquipmentUnderEquipment(shelf, equipment).map(e => e.name).join(", ")}が下にあります
                                                </div>
                                            }
                                            {
                                                equipment.id === -1 ?
                                                    <span>{equipment.name}</span> :
                                                    <Link href={`/equipment/${equipment.id}`} className="w-full h-full flex items-center justify-center">
                                                        {equipment.name}
                                                    </Link>
                                            }
                                        </div>
                                        
                                }
                            </div>    
                        )
                    ))
                }
            </div>
        </WhiteFrameUI>
    )
}