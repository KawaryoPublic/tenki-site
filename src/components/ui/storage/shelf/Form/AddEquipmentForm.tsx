import BlueButton from "@/components/ui/global/Button/BlueButton";
import DefaultSelect from "@/components/ui/global/Form/DefaultSelect";
import { Equipment, EquipmentInstance } from "@/lib/types";
import { getEquipmentId } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import Form from "next/form";

export default function AddEquipmentForm({ equipment, shelfSize, shelfEquipmentLength, setShelfEquipment, setAdd, height }: { equipment: Equipment[], shelfSize: number[], shelfEquipmentLength: number, setShelfEquipment: Dispatch<SetStateAction<{equipment: EquipmentInstance, state: "none" | "added" | "updated" | "deleted"}[]>>, setAdd: Dispatch<SetStateAction<boolean>>, height: number }) {

    return (
        <Form 
            className="flex flex-col gap-4"
            action={async (formData) => {
                setAdd(false);

                const equipmentData = equipment.find(eq => eq.id === Number(formData.get("equipment")));

                if (!equipmentData) return;

                let equipmentSize = equipmentData.size;

                if(equipmentSize[0] > shelfSize[0] || equipmentSize[1] > shelfSize[1]) {
                    if(equipmentSize[1] > shelfSize[0] || equipmentSize[0] > shelfSize[1]) {
                        alert("この機材は棚に入りません");
                        return;
                    }

                    equipmentSize = [equipmentSize[1], equipmentSize[0]];
                }

                setShelfEquipment(prev => [...prev, { equipment: { 
                    id: shelfEquipmentLength + 1, 
                    name: equipmentData.name, 
                    size: equipmentSize, 
                    position: [0, 0], 
                    height: height, 
                    isEquipment: true 
                }, state: "added" }]);
            }}
        >
            <DefaultSelect
                title="機材"
                name="equipment"
                options={equipment.map(eq => ({ value: eq.id, label: `${getEquipmentId(eq)} ${eq.name}` }))}
                required
            />
            <div>
                <BlueButton type="submit">追加</BlueButton>
            </div>
        </Form>
    )
}