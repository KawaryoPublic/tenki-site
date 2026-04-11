import { Location, Shelf } from "@/lib/types";
import { useEffect, useState, RefObject, Dispatch, SetStateAction } from "react";
import WhiteFrameUI from "../../global/WhiteFrameUI";
import { fitToParentSize } from "@/lib/utils";
import Link from "next/link";
import EditShelfForm from "./Form/EditShelfForm";
import AddShelfForm from "./Form/AddShelfForm";

export default function EditLocationMapUI({ location, shelves, setShelves, parentRef, add, className = "" }: { location: Location, shelves: Shelf[], setShelves: Dispatch<SetStateAction<Shelf[]>> , parentRef: RefObject<HTMLElement | null>, add: boolean, className?: string }) {
    const [ size, setSize ] = useState<number[]>([]);
    const [ addedShelves, setAddedShelves ] = useState<{
        name: string,
        type: number,
        size: number[],
        position: number[]
    }[]>([]);
    const [ selectedIndex, setSelectedIndex ] = useState<number>(-1);
    const [ render, setRender ] = useState<number>(0);

    useEffect(() => {
        setSize(fitToParentSize(parentRef, location?.size[0] / location?.size[1]));
    }, [location]);

    return (
        <WhiteFrameUI 
            className={`absolute ${className}`}
            style={{
                width: `${size[0]}px`,
                height: `${size[1]}px`
            }}
        >
            <button className={`fixed top-0 bottom-0 left-0 right-0 ${selectedIndex !== -1 ? "opacity-50 bg-black z-1" : ""}`} onClick={() => setSelectedIndex(-1)} ></button>
            <Link className={`fixed top-0 bottom-0 left-0 right-0 cursor-default ${add ? "opacity-50 bg-black z-1" : ""}`} href={`/storage/location/edit/${location.id}`} ></Link>
            <div className="w-full h-full border-2 relative">
                {
                    shelves.map((shelf, i) => (
                        <button 
                            key={i}
                            onClick={() => setSelectedIndex(i)}
                            className={`absolute text-center text-xs md:text-sm overflow-hidden flex items-center justify-center ${shelf.type === 0 ? "bg-gray-300" : "bg-gray-200"} ${selectedIndex === i ? "border-2 z-2" : "border"} hover:border-2`}
                            style={{
                                width: `${shelf.size[0] / location.size[0] * 100}%`,
                                height: `${shelf.size[1] / location.size[1] * 100}%`,
                                left: `${shelf.position[0] / location.size[0] * 100}%`,
                                bottom: `${shelf.position[1] / location.size[1] * 100}%`,
                            }}
                        >
                            <span className="whitespace-nowrap">{shelf.name}</span>
                        </button>
                    ))
                }
                {
                    addedShelves.map((shelf, i) => (
                        <button 
                            key={i}
                            onClick={() => setSelectedIndex(i)}
                            className={`absolute text-center text-xs md:text-sm overflow-hidden flex items-center justify-center ${shelf.type === 0 ? "bg-gray-300" : "bg-gray-200"} ${selectedIndex === i ? "border-2 z-2" : "border"} hover:border-2`}
                            style={{
                                width: `${shelf.size[0] / location.size[0] * 100}%`,
                                height: `${shelf.size[1] / location.size[1] * 100}%`,
                                left: `${shelf.position[0] / location.size[0] * 100}%`,
                                bottom: `${shelf.position[1] / location.size[1] * 100}%`,
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
                       <WhiteFrameUI className="z-2 fixed left-3 right-3 md:left-[20%] md:right-[20%] top-6 shadow-2xl">
                            <EditShelfForm locationSize={location.size} shelves={shelves} setShelves={setShelves} selectedIndex={selectedIndex} setRender={setRender} />
                        </WhiteFrameUI>
                }
                {
                    add &&
                    <WhiteFrameUI className="z-2 fixed left-3 right-3 md:left-[20%] md:right-[20%] top-6 shadow-2xl">
                        <AddShelfForm id={location.id} setShelves={setShelves} />
                    </WhiteFrameUI>
                }
            </div>
        </WhiteFrameUI>
    );
}