import { Location, Shelf } from "@/lib/types";
import { useEffect, useState, RefObject, Dispatch, SetStateAction } from "react";
import WhiteFrameUI from "../../global/WhiteFrameUI";
import { fitToParentSize } from "@/lib/utils";
import EditShelfForm from "./Form/EditShelfForm";
import AddShelfForm from "./Form/AddShelfForm";

export default function EditLocationMapUI({ location, shelves, setShelves, parentRef, add, setAdd }: { location: Location, shelves: {shelf: Shelf, updated: boolean}[], setShelves: Dispatch<SetStateAction<{shelf: Shelf, updated: boolean}[]>>, parentRef: RefObject<HTMLElement | null>, add: boolean, setAdd: Dispatch<SetStateAction<boolean>> }) {
    const [ size, setSize ] = useState<number[]>([]);
    const [ selectedIndex, setSelectedIndex ] = useState<number>(-1);

    useEffect(() => {
        setSize(fitToParentSize(parentRef, location?.size[0] / location?.size[1]));

        const preventRefresh = (e) => {
            e.preventDefault();
            return (e.returnValue = '');
        };

        window.addEventListener('beforeunload', preventRefresh);
        return () => {
            window.removeEventListener('beforeunload', preventRefresh);
        }
    }, [location]);

    return (
        <WhiteFrameUI 
            className="absolute"
            style={{
                width: `${size[0]}px`,
                height: `${size[1]}px`
            }}
        >
            <button className={`fixed top-0 bottom-0 left-0 right-0 ${selectedIndex !== -1 ? "opacity-50 bg-black z-1" : ""}`} onClick={() => setSelectedIndex(-1)} ></button>
            <button className={`fixed top-0 bottom-0 left-0 right-0 cursor-default ${add ? "opacity-50 bg-black z-1" : ""}`} onClick={() => setAdd(false)} ></button>
            <div className="w-full h-full border-2 relative">
                {
                    shelves.map(({ shelf, updated }, i) => (
                        <button 
                            key={i}
                            onClick={() => setSelectedIndex(i)}
                            className={`absolute text-center text-xs md:text-sm overflow-hidden flex items-center justify-center hover:border-2 ${shelf.type === 0 ? "bg-gray-300" : shelf.type === 1 ? "bg-gray-200" : "bg-gray-100"} ${selectedIndex === i ? "border-2 z-2" : "border"}`}
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
                            <EditShelfForm locationSize={location.size} shelves={shelves} setShelves={setShelves} selectedIndex={selectedIndex} />
                        </WhiteFrameUI>
                }
                {
                    add &&
                    <WhiteFrameUI className="z-2 fixed left-3 right-3 md:left-[20%] md:right-[20%] top-6 shadow-2xl">
                        <AddShelfForm shelfCount={shelves.length} setShelves={setShelves} setAdd={setAdd} />
                    </WhiteFrameUI>
                }
            </div>
        </WhiteFrameUI>
    );
}