import { Location, Shelf } from "@/lib/types";
import { useEffect, useState, RefObject, Dispatch, SetActionState } from "react";
import WhiteFrameUI from "../../global/WhiteFrameUI";
import { checkCollision, fitToParentSize } from "@/lib/utils";
import DefaultVectorInput from "../../global/Form/DefaultVectorInput";
import DefaultSelect from "../../global/Form/DefaultSelect";
import { SHELF_TYPES } from "@/lib/const";

export default function EditLocationMapUI({ location, shelves, setShelves, parentRef, className = "" }: { location: Location, shelves: Shelf[], setShelves: Dispatch<SetActionState<Shelf[]>> , parentRef: RefObject<HTMLElement | null>, className?: string }) {
    const [ size, setSize ] = useState<number[]>([]);
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
            <button className="z-1 fixed top-0 bottom-0 left-0 right-0" onClick={() => setSelectedIndex(-1)}></button>
            <div className="w-full h-full border-2 relative">
                {
                    shelves.map((shelf, i) => (
                        <button 
                            key={i}
                            onClick={() => setSelectedIndex(i)}
                            className={`z-2 absolute text-center text-xs md:text-sm overflow-hidden flex items-center justify-center ${shelf.type === 0 ? "bg-gray-300" : "bg-gray-200"} ${selectedIndex === i ? "border-2" : "border"} hover:border-2`}
                            style={{
                                width: `${shelf.size[0] / location.size[0] * 100}%`,
                                height: `${shelf.size[1] / location.size[1] * 100}%`,
                                left: `${shelf.position[0] / location.size[0] * 100}%`,
                                bottom: `${shelf.position[1] / location.size[1] * 100}%`,
                            }}
                        >
                            {
                                i !== selectedIndex ? <span className="whitespace-nowrap">{shelf.name}</span> :
                                <input 
                                    type="text" 
                                    defaultValue={shelf.name}
                                    onChange={e => {
                                        const newShelves = shelves;
                                        newShelves[i].name = e.target.value;
                                        setShelves(newShelves);
                                    }} 
                                    className="field-sizing-content p-1" 
                                />
                            }
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
                       <WhiteFrameUI
                            className="z-2 absolute"
                            style={{
                                left: `${(shelves[selectedIndex].position[0] + shelves[selectedIndex].size[0]) / location.size[0] * 100 + 4}%`,
                                bottom: `${shelves[selectedIndex].position[1] / location.size[1] * 100}%`,
                            }}
                       >
                            <form className="flex flex-col gap-4">
                                <DefaultSelect
                                    title="種類"
                                    name="type"
                                    options={SHELF_TYPES.map((shelf, i) => {
                                        return { value: i, label: shelf}
                                    })}
                                    value={shelves[selectedIndex].type}
                                    onChange={e => {
                                        const newShelves = shelves;
                                        newShelves[selectedIndex].type = Number(e.target.value);
                                        setShelves(newShelves);
                                        setRender(render + 1);
                                    }}
                                />
                                <DefaultVectorInput 
                                    title="サイズ[cm]" 
                                    name="size" 
                                    labels={["縦幅", "横幅"]} 
                                    values={shelves[selectedIndex].size} 
                                    onChange={(e, i) => {
                                        const newShelves = shelves;
                                        const thisShelf = newShelves[selectedIndex];
                                        thisShelf.size[i] = Number(e.target.value);

                                        if(thisShelf.size[i] + thisShelf.position[i] > location.size[i]) {
                                            alert("倉庫とぶつかっています。");
                                            return;
                                        }

                                        for(const shelf of newShelves) {
                                            if(shelf === thisShelf) continue;

                                            if(checkCollision(thisShelf.size, thisShelf.position, shelf.size, shelf.position)) {
                                                alert(`${shelf.name}とぶつかります。`);
                                                return;
                                            }
                                        }

                                        setShelves(newShelves);
                                        setRender(render + 1);
                                    }} 
                                />
                                <DefaultVectorInput 
                                    title="座標[cm]" 
                                    name="position" 
                                    labels={["x", "y"]} 
                                    values={shelves[selectedIndex].position} 
                                    onChange={(e, i) => {
                                        const newShelves = shelves;
                                        const thisShelf = newShelves[selectedIndex];
                                        thisShelf.position[i] = Number(e.target.value);

                                        if(thisShelf.size[i] + thisShelf.position[i] > location.size[i]) {
                                            alert("倉庫とぶつかります。");
                                            return;
                                        }

                                        for(const shelf of newShelves) {
                                            if(shelf === thisShelf) continue;

                                            if(checkCollision(thisShelf.size, thisShelf.position, shelf.size, shelf.position)) {
                                                alert(`${shelf.name}とぶつかります。`);
                                                return;
                                            }
                                        }
                                        
                                        setShelves(newShelves);
                                        setRender(render + 1);
                                    }} 
                                />
                            </form>
                        </WhiteFrameUI>
                }
            </div>
        </WhiteFrameUI>
    );
}