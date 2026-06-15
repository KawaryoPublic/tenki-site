import { Location, Shelf } from "@/lib/types";
import WhiteFrameUI from "../../global/WhiteFrameUI";
import Link from "next/link";
import { checkCollision } from "@/lib/utils";

export default function LocationMapUI({ location, size }: { location: Location, size: number[] }) {
    const getEquipmentUnderShelf = (thisShelf: Shelf) => {
        const shelves = [];

        for(const shelf of location.shelves) {
            if(shelf === thisShelf) continue;
        
            if(checkCollision(thisShelf.size, thisShelf.position, shelf.size, shelf.position)) {
                shelves.push(shelf);
            }
        }

        return shelves;
    }

    return (
        <WhiteFrameUI 
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
                            className={`group absolute border text-center text-xs md:text-sm overflow-hidden flex items-center justify-center ${shelf.type === 0 ? "bg-gray-300 hover:border-2" : shelf.type === 1 ? "bg-gray-200" : "bg-gray-100"}`}
                            style={{
                                width: `${shelf.size[0] / location.size[0] * 100}%`,
                                height: `${shelf.size[1] / location.size[1] * 100}%`,
                                left: `${shelf.position[0] / location.size[0] * 100}%`,
                                bottom: `${shelf.position[1] / location.size[1] * 100}%`,
                                zIndex: shelf.z
                            }}
                        >
                            {
                                shelf.type === 0 ? 
                                    <Link href={`/storage/shelf/${shelf.id}?height=0`} className="w-full h-full flex items-center justify-center">
                                        {shelf.name}
                                    </Link> :
                                    <div>
                                        {
                                            getEquipmentUnderShelf(shelf).length > 0 && 
                                            <div 
                                                className="z-1002 fixed hidden group-hover:block text-gray-900 bg-white rounded-lg shadow-md p-2 md:p-4"
                                                style={{
                                                    left: `${(shelf.position[0] + shelf.size[0]) / location.size[0] * 100 - 15}%`,
                                                    bottom: `${(shelf.position[1] + shelf.size[1]) / location.size[1] * 100}%`,
                                                }}
                                            >
                                                {getEquipmentUnderShelf(shelf).map(e => e.name).join(", ")}が下にあります
                                            </div>
                                        }
                                        <span>{shelf.name}</span>
                                    </div>
                            }
                        </div>
                    ))
                }
            </div>
        </WhiteFrameUI>
    );
}