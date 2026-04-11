import DefaultInput from "@/components/ui/global/Form/DefaultInput";
import DefaultSelect from "@/components/ui/global/Form/DefaultSelect";
import DefaultVectorInput from "@/components/ui/global/Form/DefaultVectorInput";
import { SHELF_TYPES } from "@/lib/const";
import { Location, Shelf } from "@/lib/types";
import { checkCollision } from "@/lib/utils";
import Form from "next/form";
import { Dispatch, SetStateAction } from "react";

export default function EditShelfForm({ locationSize, shelves, setShelves, selectedIndex, setRender }: { locationSize: number[], shelves: Shelf[], setShelves: Dispatch<SetStateAction<Shelf[]>>, selectedIndex: number, setRender: Dispatch<SetStateAction<number>> }) {
    return (
        <Form className="flex flex-col gap-4">
            <DefaultInput
                title="名前"
                name="name"
                value={shelves[selectedIndex].name}
                onChange={e => {
                    const newShelves = shelves;
                    newShelves[selectedIndex].name = e.target.value;
                    setShelves(newShelves);
                    setRender(prev => prev + 1);
                }}
                label
                required
            />
            <DefaultSelect
                title="種類"
                name="type"
                options={SHELF_TYPES.map((shelf, i) => ({ value: i, label: shelf}))}
                value={shelves[selectedIndex].type}
                onChange={e => {
                    const newShelves = shelves;
                    newShelves[selectedIndex].type = Number(e.target.value);
                    setShelves(newShelves);
                    setRender(prev => prev + 1);
                }}
                label
                required
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

                    /**
                    if(thisShelf.size[i] + thisShelf.position[i] > locationSize[i]) {
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
                    */

                    setShelves(newShelves);
                    setRender(prev => prev + 1);
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

                    /**
                    if(thisShelf.size[i] + thisShelf.position[i] > locationSize[i]) {
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
                    */
                                        
                    setShelves(newShelves);
                    setRender(prev => prev + 1);
                }} 
            />
        </Form>
    )
}