import { checkTier, splitLinksAndHeaders } from "@/lib/utils";
import BlueButton from "../global/Button/BlueButton";
import WhiteFrameUI from "../global/WhiteFrameUI";
import { Equipment, TIER } from "@/lib/types";
import FileLinkUI from "../global/FileLinkUI";
import DeleteEquipmentButton from "./Button/DeleteEquipmentButton";
import { LOCATIONS_LABELS } from "@/lib/const";

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
                <span>{LOCATIONS_LABELS[equipment.location as keyof typeof LOCATIONS_LABELS]}</span>
            </div>
            <div className="whitespace-pre-wrap text-sm md:text-base">
                <p className="font-bold">個数</p>
                <span>{equipment.number}</span>
            </div>
            <div className="whitespace-pre-wrap text-sm md:text-base">
                <p className="font-bold">サイズ</p>
                <span>{`${equipment.size[0]} × ${equipment.size[1]} × ${equipment.size[2]}`}</span>
            </div>
            <div className="whitespace-pre-wrap text-sm md:text-base">
                <p className="font-bold">内容物</p>
                <ul>
                    {
                        equipment.contents.map((content, i) => (
                            <p key={i}>・{content}</p>
                        ))
                    }
                </ul>
            </div>
            <div className="whitespace-pre-wrap text-sm md:text-base">
                <p className="font-bold">説明</p>
                <span>{equipment.description}</span>
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