import { Equipment, EquipmentInstance, Shelf } from "@/lib/types";
import { useState, Dispatch, SetStateAction } from "react";
import WhiteFrameUI from "../../global/WhiteFrameUI";
import EditEquipmentForm from "./Form/EditEquipmentForm";
import AddEquipmentForm from "./Form/AddEquipmentForm";

export default function EditShelfMapUI({ shelf, shelfEquipment, setShelfEquipment, size, height, add, setAdd, equipment }: { shelf: Shelf, shelfEquipment: {equipment: EquipmentInstance, state: "none" | "added" | "updated" | "deleted"}[], setShelfEquipment: Dispatch<SetStateAction<{equipment: EquipmentInstance, state: "none" | "added" | "updated" | "deleted"}[]>>, size: number[], height: number, add: boolean, setAdd: Dispatch<SetStateAction<boolean>>, equipment: Equipment[] }) {
    const [ selectedIndex, setSelectedIndex ] = useState<number>(-1);
    return (
        <WhiteFrameUI 
            style={{
                width: `${size[0]}px`,
                height: `${size[1]}px`
            }}
        >
            <button className={`fixed top-0 bottom-0 left-0 right-0 opacity-50 bg-black z-1 ${selectedIndex === -1 && "hidden"}`} onClick={() => setSelectedIndex(-1)} ></button>
            <button className={`fixed top-0 bottom-0 left-0 right-0 opacity-50 bg-black z-1 ${!add && "hidden"}`} onClick={() => setAdd(false)} ></button>
            <div className="w-full h-full border-2 relative">
                {
                    shelfEquipment.map(({ equipment, state }, i) => (
                        equipment.height === height && state !== "deleted" &&
                        <button 
                            key={i}
                            onClick={() => setSelectedIndex(i)}
                            className={`absolute text-center text-xs md:text-sm overflow-hidden flex items-center justify-center hover:border-2 bg-gray-300 ${selectedIndex === i ? "border-2 z-2" : "border"}`}
                            style={{
                                width: `${equipment.size[0] / shelf.size[0] * 100}%`,
                                height: `${equipment.size[1] / shelf.size[1] * 100}%`,
                                left: `${equipment.position[0] / shelf.size[0] * 100}%`,
                                bottom: `${equipment.position[1] / shelf.size[1] * 100}%`,
                            }}
                        >
                            <span className="whitespace-nowrap">{equipment.name}</span>
                        </button>
                    ))
                }
                {
                    add &&
                    <WhiteFrameUI className={`z-2 fixed left-3 right-3 md:left-[20%] md:right-[20%] shadow-2xl top-3`}>
                        <AddEquipmentForm
                            equipment={equipment}
                            shelfSize={shelf.size}
                            shelfEquipmentLength={shelfEquipment.length}
                            setShelfEquipment={setShelfEquipment}
                            setAdd={setAdd}
                            height={height}
                        />
                    </WhiteFrameUI>
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
                       <WhiteFrameUI className={`z-2 fixed left-3 right-3 md:left-[20%] md:right-[20%] shadow-2xl ${shelfEquipment[selectedIndex].equipment.position[1] + shelfEquipment[selectedIndex].equipment.size[1] < shelf.size[1] * 0.65 ? "top-3" : "bottom-3"}`}>
                            <EditEquipmentForm
                                shelfSize={shelf.size}
                                shelfEquipment={shelfEquipment}
                                setShelfEquipment={setShelfEquipment}
                                selectedIndex={selectedIndex}
                                setSelectedIndex={setSelectedIndex}
                            />
                        </WhiteFrameUI>
                }
            </div>
        </WhiteFrameUI>
    );
}