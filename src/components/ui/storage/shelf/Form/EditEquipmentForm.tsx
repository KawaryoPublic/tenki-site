import BlueButton from "@/components/ui/global/Button/BlueButton";
import RedButton from "@/components/ui/global/Button/RedButton";
import DefaultInput from "@/components/ui/global/Form/DefaultInput";
import DefaultVectorInput from "@/components/ui/global/Form/DefaultVectorInput";
import { EquipmentInstance } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";

export default function EditEquipmentForm({ shelfSize, shelfEquipment, setShelfEquipment, selectedIndex, setSelectedIndex }: { shelfSize: number[], shelfEquipment: {equipment: EquipmentInstance, state: "none" | "added" | "updated" | "deleted"}[], setShelfEquipment: Dispatch<SetStateAction<{shelf: EquipmentInstance, state: "none" | "added" | "updated" | "deleted"}[]>>, selectedIndex: number, setSelectedIndex: Dispatch<SetStateAction<number>> }) {
    const equipment = shelfEquipment[selectedIndex].equipment;

    return (
        <form className="flex flex-col gap-4">
            <DefaultInput
                title="名前"
                name="name"
                value={equipment.name}
                onChange={e => {     
                    const newEquipment = shelfEquipment;
                    newEquipment[selectedIndex].equipment.name = e.target.value;
                    
                    if(newEquipment[selectedIndex].state !== "added") {
                        newEquipment[selectedIndex].state = "updated";
                    }

                    setShelfEquipment([...newEquipment]);
                }}
                label
                required
            />
            <DefaultVectorInput 
                title="座標[cm]" 
                name="position" 
                labels={["x", "y"]} 
                values={equipment.position} 
                onChange={(e, i) => {
                    const newEquipment = shelfEquipment;
                    const thisEquipment = newEquipment[selectedIndex].equipment;
                    thisEquipment.position[i] = Number(e.target.value);

                    if(thisEquipment.position[i] <= 0) {
                        thisEquipment.position[i] = 0;
                    }

                    if(thisEquipment.size[i] + thisEquipment.position[i] > shelfSize[i]) {
                        thisEquipment.position[i] = shelfSize[i] - thisEquipment.size[i];
                    }

                    if(newEquipment[selectedIndex].state !== "added") {
                        newEquipment[selectedIndex].state = "updated";
                    }

                    setShelfEquipment([...newEquipment]);
                }} 
            />
            <div>
                <BlueButton
                    type="button"
                    onClick={() => {
                        const newEquipment = shelfEquipment;
                        const thisEquipment = newEquipment[selectedIndex].equipment;

                        const newSize = [thisEquipment.size[1], thisEquipment.size[0]];

                        for(let i = 0; i < 2; i++) {
                            if(newSize[i] + thisEquipment.position[i] > shelfSize[i]) {
                                const newPosition = shelfSize[i] - newSize[i];

                                if(newPosition < 0) {
                                    alert("回転出来ません");
                                    return;
                                }

                                thisEquipment.position[i] = newPosition;
                            }
                        }

                        newEquipment[selectedIndex].equipment.size = newSize;

                        if(newEquipment[selectedIndex].state !== "added") {
                            newEquipment[selectedIndex].state = "updated";
                        }

                        setShelfEquipment([...newEquipment]);
                    }}
                >回転</BlueButton>
            </div>
            <div>
                <RedButton 
                    type="button"
                    onClick={() => {
                        if(!confirm("本当に削除しますか？")) return;

                        const newEquipment = shelfEquipment;
                        let state = newEquipment[selectedIndex].state;

                        if(state === "added") {
                            newEquipment.splice(selectedIndex, 1);
                        } else {
                            newEquipment[selectedIndex].state = "deleted";
                        }

                        setShelfEquipment([...newEquipment]);
                        setSelectedIndex(-1);
                    }}
                >
                    削除
                </RedButton>
            </div>
        </form>
    )
}