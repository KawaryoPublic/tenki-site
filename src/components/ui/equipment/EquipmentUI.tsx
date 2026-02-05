import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { checkTier } from "@/lib/utils";
import { Equipment } from "@/lib/types";
import BlueButton from "../global/Button/BlueButton";
import Link from "next/link";
import DeleteEquipmentButton from "./Button/DeleteEquipmentButton";

export default function EquipmentUI({ equipment, tier }: { equipment: Equipment, tier: number }) {
    const updatedAt = new Date(equipment.updatedAt);

    return (
        <WhiteFrameUI className="flex flex-col gap-2">
            <div className={`flex justify-between items-center ${equipment.tags.length !== 0 && "border-b pb-2"}`}>
                <Link className="text-xl md:text-3xl font-bold" href={`equipment/${equipment.id}`}>{equipment.name}</Link>
                <div className="flex items-center gap-2 md:gap-4">
                    <span className="text-gray-800 text-xs md:text-sm">{`${updatedAt.getFullYear() === (new Date()).getFullYear() ? "" : `${updatedAt.getFullYear()}年`}${updatedAt.getMonth() + 1}月${updatedAt.getDate()}日`}</span>
                    {
                        checkTier(tier) &&
                        <>
                            <BlueButton href={`/equipment/edit/${equipment.id}`}>編集</BlueButton>
                            <DeleteEquipmentButton id={equipment.id} urls={equipment.urls} />
                        </>
                    }
                </div>
            </div>
            <div className="text-xs md:text-sm text-blue-700 font-bold">
                {
                    equipment.tags.map((tag, index) => 
                        <Link key={index} href={`/equipment?tags=${tag}`} className="mr-2">#{tag}</Link>
                    )
                }
            </div>
        </WhiteFrameUI>
    );
}