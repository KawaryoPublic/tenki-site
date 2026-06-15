import { Equipment, Location, Shelf } from "@/lib/types";
import { useState, Dispatch, SetStateAction } from "react";
import WhiteFrameUI from "../../global/WhiteFrameUI";
import EditShelfForm from "./Form/EditShelfForm";

export default function EditLocationMapUI({ location, shelves, setShelves, size, equipment }: { location: Location, shelves: {shelf: Shelf, state: "none" | "added" | "updated" | "deleted"}[], setShelves: Dispatch<SetStateAction<{shelf: Shelf, state: "none" | "added" | "updated" | "deleted"}[]>>, size: number[], equipment: Equipment[] }) {
    const [ selectedIndex, setSelectedIndex ] = useState<number>(-1);

    return (
        <WhiteFrameUI 
            style={{
                width: `${size[0]}px`,
                height: `${size[1]}px`
            }}
        >
            <button className={`fixed top-0 bottom-0 left-0 right-0 opacity-50 bg-black z-999 ${selectedIndex === -1 && "hidden"}`} onClick={() => setSelectedIndex(-1)} ></button>
            <div className="w-full h-full border-2 relative">
                {
                    shelves.map(({ shelf, state }, i) => (
                        state !== "deleted" &&
                        <button 
                            key={i}
                            onClick={() => setSelectedIndex(i)}
                            className={`absolute text-center text-xs md:text-sm overflow-hidden flex items-center justify-center hover:border-2 ${shelf.type === 0 ? "bg-gray-300" : shelf.type === 1 ? "bg-gray-200" : "bg-gray-100"} ${selectedIndex === i ? "border-2" : "border"}`}
                            style={{
                                width: `${shelf.size[0] / location.size[0] * 100}%`,
                                height: `${shelf.size[1] / location.size[1] * 100}%`,
                                left: `${shelf.position[0] / location.size[0] * 100}%`,
                                bottom: `${shelf.position[1] / location.size[1] * 100}%`,
                                zIndex: shelf.z
                            }}
                        >
                            <span className="whitespace-nowrap">{shelf.name}</span>
                        </button>
                    ))
                }
                {
                    selectedIndex !== -1 && 
                        /*
                        <>
                            <button 
                                className="absolute border w-[3%] aspect-square translate-x-[-50%] translate-y-[50%] bg-gray-200"
                                onClick={() => console.log("a")}
                                style={{
                                    left: `${selectedShelf.position[0] / location.size[0] * 100}%`,
                                    bottom: `${selectedShelf.position[1] / location.size[1] * 100}%`,
                                }}
                            ></button>
                            <button 
                                className="absolute border w-[3%] aspect-square translate-x-[-50%] translate-y-[50%] bg-gray-200"
                                onClick={() => console.log("a")}
                                style={{
                                    left: `${(selectedShelf.position[0] + selectedShelf.size[0]) / location.size[0] * 100}%`,
                                    bottom: `${selectedShelf.position[1] / location.size[1] * 100}%`,
                                }}
                            ></button>
                            <button 
                                className="absolute border w-[3%] aspect-square translate-x-[-50%] translate-y-[50%] bg-gray-200"
                                onClick={() => console.log("a")}
                                style={{
                                    left: `${(selectedShelf.position[0] + selectedShelf.size[0]) / location.size[0] * 100}%`,
                                    bottom: `${(selectedShelf.position[1] + selectedShelf.size[1]) / location.size[1] * 100}%`,
                                }}
                            ></button>
                            <button 
                                className="absolute border w-[3%] aspect-square translate-x-[-50%] translate-y-[50%] bg-gray-200"
                                onClick={() => console.log("a")}
                                style={{
                                    left: `${selectedShelf.position[0] / location.size[0] * 100}%`,
                                    bottom: `${(selectedShelf.position[1] + selectedShelf.size[1]) / location.size[1] * 100}%`,
                                }}
                            ></button>
                        </>
                        */
                       <WhiteFrameUI className={`z-1001 fixed left-3 right-3 md:left-[20%] md:right-[20%] shadow-2xl ${shelves[selectedIndex].shelf.position[1] + shelves[selectedIndex].shelf.size[1] < location.size[1] * 0.65 ? "top-3" : "bottom-3"}`}>
                            <EditShelfForm location={location} shelves={shelves} setShelves={setShelves} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} equipment={equipment} />
                        </WhiteFrameUI>
                }
            </div>
        </WhiteFrameUI>
    );
}