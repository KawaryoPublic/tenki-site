import BlueButton from "@/components/ui/global/Button/BlueButton";
import RedButton from "@/components/ui/global/Button/RedButton";
import DefaultInput from "@/components/ui/global/Form/DefaultInput";
import DefaultSelect from "@/components/ui/global/Form/DefaultSelect";
import DefaultVectorInput from "@/components/ui/global/Form/DefaultVectorInput";
import { SHELF_TYPES } from "@/lib/const";
import { Equipment, Location, Shelf } from "@/lib/types";
import { getEquipmentCount, getEquipmentId } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

export default function EditShelfForm({ location, shelves, setShelves, selectedIndex, setSelectedIndex, equipment }: { location: Location, shelves: {shelf: Shelf, state: "none" | "added" | "updated" | "deleted"}[], setShelves: Dispatch<SetStateAction<{shelf: Shelf, state: "none" | "added" | "updated" | "deleted"}[]>>, selectedIndex: number, setSelectedIndex: Dispatch<SetStateAction<number>>, equipment: Equipment[] }) {
    const shelf = shelves[selectedIndex].shelf;

    const markEdited = (shelf: {shelf: Shelf, state: "none" | "added" | "updated" | "deleted"}) => {
        if(shelf.state !== "added") {
            shelf.state = "updated";
        }
    }

    return (
        <form className="flex flex-col gap-4">
            <DefaultInput
                title="名前"
                name="name"
                value={shelf.name}
                onChange={e => {     
                    const newShelves = shelves;
                    const thisShelf = newShelves[selectedIndex];
                    thisShelf.shelf.name = e.target.value;

                    markEdited(thisShelf);

                    setShelves([...newShelves]);
                }}
                label
                required
            />
            <DefaultSelect
                title="種類"
                name="type"
                options={SHELF_TYPES.map((shelf, i) => ({ value: i, label: shelf}))}
                value={shelf.type}
                onChange={e => {
                    const newShelves = shelves;
                    const thisShelf = newShelves[selectedIndex];
                    thisShelf.shelf.type = Number(e.target.value);

                    if(e.target.value !== "0") {
                        thisShelf.shelf.height = [39];
                    }

                    markEdited(thisShelf);

                    setShelves([...newShelves]);
                }}
                label
                required
            />
            {
                shelf.type === 0 &&
                <DefaultInput
                    title="段数"
                    name="height"
                    value={shelf.height.length}
                    onChange={e => {
                        const newShelves = shelves;
                        const thisShelf = newShelves[selectedIndex];
                        thisShelf.shelf.height = new Array(Number(e.target.value) || 1).fill(39);

                        markEdited(thisShelf);

                        setShelves([...newShelves]);
                    }}
                    label
                    required
                />  
            }
            {
                shelf.type === 1 &&
                <DefaultSelect
                    title={"機材" + shelf.equipment[0].id}
                    name="equipment"
                    options={[{ value: -1, label: "その他" }, ...equipment.filter(eq => eq.count > getEquipmentCount(location, eq.id)).map(eq => ({ value: eq.id, label: `${getEquipmentId(eq)} ${eq.name} ${(eq.count - getEquipmentCount(location, eq.id)) === 1 ? "" : "×" + (eq.count - getEquipmentCount(location, eq.id))}` }))]}
                    value={shelf.equipment.length > 0 ? shelf.equipment[0].id : -1}
                    onChange={e => {
                        const newShelves = shelves;
                        const thisShelf = newShelves[selectedIndex];

                        if(e.target.value === "-1") {
                            thisShelf.shelf.equipment = [{
                                id: -1,
                                name: "名無し",
                                size: [20, 20],
                                position: [0, 0],
                                height: 39,
                                z: 500
                            }];
                        } else {
                            const equipmentData = equipment.find(eq => eq.id === Number(e.target.value));

                            if (!equipmentData) return;

                            thisShelf.shelf.equipment = [{
                                id: equipmentData.id,
                                name: equipmentData.name,
                                size: equipmentData.size,
                                position: [0, 0],
                                height: 39,
                                z: 500
                            }];

                            thisShelf.shelf.name = equipmentData.name;
                            thisShelf.shelf.size = equipmentData.size;
                        }

                        console.log(thisShelf.shelf.equipment);

                        markEdited(thisShelf);

                        setShelves([...newShelves]);
                    }}
                    required
                    label
                />
            }
            {
                (shelf.type !== 1 || (shelf.equipment.length !== 0 && shelf.equipment[0].id === -1)) &&
                <DefaultVectorInput 
                    title="サイズ[cm]" 
                    name="size" 
                    labels={["縦幅", "横幅"]} 
                    values={shelf.size} 
                    onChange={(e, i) => {
                        const newShelves = shelves;
                        const thisShelf = newShelves[selectedIndex].shelf;
                        thisShelf.size[i] = Number(e.target.value);

                        if(thisShelf.size[i] <= 0) {
                            thisShelf.size[i] = 1;
                        }

                        if(thisShelf.size[i] + thisShelf.position[i] > location.size[i]) {
                            thisShelf.size[i] = location.size[i] - thisShelf.position[i];
                        }

                        markEdited(newShelves[selectedIndex]);

                        setShelves([...newShelves]);
                    }} 
                />
            }
            <DefaultVectorInput 
                title="座標[cm]" 
                name="position" 
                labels={["x", "y"]} 
                values={shelf.position} 
                onChange={(e, i) => {
                    const newShelves = shelves;
                    const thisShelf = newShelves[selectedIndex].shelf;
                    thisShelf.position[i] = Number(e.target.value);

                    if(thisShelf.position[i] <= 0) {
                        thisShelf.position[i] = 0;
                    }

                    if(thisShelf.size[i] + thisShelf.position[i] > location.size[i]) {
                        thisShelf.position[i] = location.size[i] - thisShelf.size[i];
                    }

                    markEdited(newShelves[selectedIndex]);
                                        
                    setShelves([...newShelves]);
                }} 
            />
            <div className="flex gap-4">
                <BlueButton
                    className="max-sm:hidden"
                    type="button"
                    onClick={() => setSelectedIndex(-1)}
                >
                    閉じる
                </BlueButton>
                {
                    shelves.filter(s => s.shelf !== shelf).some(s => s.shelf.z >= shelf.z) &&
                    <BlueButton
                        type="button"
                        onClick={() => {
                            const newShelves = shelves;
                            const thisShelf = newShelves[selectedIndex];
                            thisShelf.shelf.z++;

                            markEdited(thisShelf);

                            setShelves([...newShelves]);
                        }}
                    >
                        前面へ
                    </BlueButton>
                }
                {
                    shelves.filter(s => s.shelf !== shelf).some(s => s.shelf.z <= shelf.z) &&
                    <BlueButton
                        type="button"
                        onClick={() => {
                            const newShelves = shelves;
                            const thisShelf = newShelves[selectedIndex];
                            thisShelf.shelf.z--;

                            markEdited(thisShelf);

                            setShelves([...newShelves]);
                        }}
                    >
                        背面へ
                    </BlueButton>
                }
                <RedButton 
                    type="button"
                    onClick={() => {
                        if(!confirm("本当に削除しますか？")) return;

                        const newShelves = shelves;
                        let state = newShelves[selectedIndex].state;

                        if(state === "added") {
                            newShelves.splice(selectedIndex, 1);
                        } else {
                            newShelves[selectedIndex].state = "deleted";
                        }

                        setShelves([...newShelves]);
                        setSelectedIndex(-1);
                    }}
                >
                    削除
                </RedButton>
            </div>
        </form>
    )
}