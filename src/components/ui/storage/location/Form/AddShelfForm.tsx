import BlueButton from "@/components/ui/global/Button/BlueButton";
import DefaultInput from "@/components/ui/global/Form/DefaultInput";
import DefaultSelect from "@/components/ui/global/Form/DefaultSelect";
import DefaultVectorInput from "@/components/ui/global/Form/DefaultVectorInput";
import { SHELF_TYPES } from "@/lib/const";
import { Location, Shelf } from "@/lib/types";
import Form from "next/form";
import { Dispatch, SetStateAction } from "react";

export default function AddShelfForm({ shelfCount, setShelves, setAdd }: { shelfCount: number, setShelves: Dispatch<SetStateAction<{shelf: Shelf, updated: boolean}[]>>, setAdd: Dispatch<SetStateAction<boolean>> }) {

    return (
        
        <Form
            action={(data) => {
                const shelf = {
                    id: shelfCount + 1,
                    name: data.get("name") as string,
                    location: null as unknown as Location,
                    type: Number(data.get("type")),
                    size: data.getAll("size").map(s => Number(s)),
                    position: data.getAll("position").map(p => Number(p)),
                    equipment: [],
                    updatedAt: null as unknown as Date,
                };

                setShelves(prev => [...prev, { shelf, updated: false }]);
                setAdd(false);
            }}
            className="flex flex-col gap-4"
        >
            <DefaultInput
                title="名前"
                name="name"
                label
                required
            />
            <DefaultSelect
                title="種類"
                name="type"
                options={SHELF_TYPES.map((shelf, i) => ({ value: i, label: shelf }))}
                label
                required
            />
            <DefaultVectorInput
                title="サイズ[cm]"
                name="size"
                labels={["縦幅", "横幅"]}
            />
            <DefaultVectorInput 
                title="座標[cm]" 
                name="position" 
                labels={["x", "y"]} 
            />
            <div>
                <BlueButton>追加</BlueButton>
            </div>
        </Form>
    )
}