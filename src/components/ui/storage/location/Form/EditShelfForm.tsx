import RedButton from "@/components/ui/global/Button/RedButton";
import DefaultInput from "@/components/ui/global/Form/DefaultInput";
import DefaultSelect from "@/components/ui/global/Form/DefaultSelect";
import DefaultVectorInput from "@/components/ui/global/Form/DefaultVectorInput";
import { SHELF_TYPES } from "@/lib/const";
import { Shelf } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";

export default function EditShelfForm({ locationSize, shelves, setShelves, selectedIndex, setSelectedIndex }: { locationSize: number[], shelves: {shelf: Shelf, state: "none" | "added" | "updated" | "deleted"}[], setShelves: Dispatch<SetStateAction<{shelf: Shelf, state: "none" | "added" | "updated" | "deleted"}[]>>, selectedIndex: number, setSelectedIndex: Dispatch<SetStateAction<number>> }) {
    const shelf = shelves[selectedIndex].shelf;

    return (
        <form className="flex flex-col gap-4">
            <DefaultInput
                title="名前"
                name="name"
                value={shelf.name}
                onChange={e => {     
                    const newShelves = shelves;
                    newShelves[selectedIndex].shelf.name = e.target.value;
                    
                    if(newShelves[selectedIndex].state !== "added") {
                        newShelves[selectedIndex].state = "updated";
                    }

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
                    newShelves[selectedIndex].shelf.type = Number(e.target.value);
                    
                    if(newShelves[selectedIndex].state !== "added") {
                        newShelves[selectedIndex].state = "updated";
                    }

                    setShelves([...newShelves]);
                }}
                label
                required
            />
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

                    if(thisShelf.size[i] + thisShelf.position[i] > locationSize[i]) {
                        thisShelf.size[i] = locationSize[i] - thisShelf.position[i];
                    }

                    if(newShelves[selectedIndex].state !== "added") {
                        newShelves[selectedIndex].state = "updated";
                    }

                    setShelves([...newShelves]);
                }} 
            />
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

                    if(thisShelf.size[i] + thisShelf.position[i] > locationSize[i]) {
                        thisShelf.position[i] = locationSize[i] - thisShelf.size[i];
                    }

                    if(newShelves[selectedIndex].state !== "added") {
                        newShelves[selectedIndex].state = "updated";
                    }
                                        
                    setShelves([...newShelves]);
                }} 
            />
            <div>
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