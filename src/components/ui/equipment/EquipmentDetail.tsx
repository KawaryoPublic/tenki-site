import { checkTier, splitLinksAndHeaders } from "@/lib/utils";
import BlueButton from "../global/Button/BlueButton";
import WhiteFrameUI from "../global/WhiteFrameUI";
import { Equipment, TIER } from "@/lib/types";
import FileLinkUI from "../global/FileLinkUI";
import DeleteEquipmentButton from "./Button/DeleteEquipmentButton";

export default function EquipmentDetailUI({ equipment, tier }: { equipment: Equipment, tier: TIER }) {
    return (
        <WhiteFrameUI className="flex flex-col gap-2">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl md:text-3xl font-bold">{equipment.name}</h2>
                <div className="flex items-center gap-2 md:gap-4">
                    {
                        checkTier(tier) && 
                        <>
                            <BlueButton href={`/equipment/edit/${equipment.id}`}>編集</BlueButton>
                            <DeleteEquipmentButton id={equipment.id}  urls={equipment.urls} />
                        </>
                    }
                </div>
            </div>
            <div className="whitespace-pre-wrap text-sm md:text-base">
                <p className="font-bold">場所</p>
                <span>{equipment.location}</span>
            </div>
            <div className="whitespace-pre-wrap text-sm md:text-base">
                <p className="font-bold">説明</p>
                <ul>
                    {
                        equipment.content.map((content, i) => (
                            <span>・{content}</span>
                        ))
                    }
                </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-sm md:text-base">
                {
                    equipment.urls.map((url, index) => (
                        <FileLinkUI key={index} url={url} filename={equipment.filenames[index]} className="py-2" />
                    ))
                }
            </div>
        </WhiteFrameUI>
    )
}