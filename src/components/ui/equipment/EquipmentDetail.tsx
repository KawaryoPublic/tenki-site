import { checkTier, splitLinksAndHeaders } from "@/lib/utils";
import BlueButton from "../global/Button/BlueButton";
import WhiteFrameUI from "../global/WhiteFrameUI";
import { Equipment, TIER } from "@/lib/types";
import FileLinkUI from "../global/FileLinkUI";
import Link from "next/link";
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
                <h2 className="font-bold">場所</h2>
                <span>{equipment.location}</span>
            </div>
            <div className="whitespace-pre-wrap text-sm md:text-base">
                <h2 className="font-bold">説明</h2>
                {
                    splitLinksAndHeaders(equipment.description).map((part, index) => (
                        part.type === "link" ? 
                            <Link key={index} href={part.content} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{part.content}</Link> :
                            part.type === "header" ?
                                <h3 key={index} className="text-lg md:text-xl font-bold mb-1">{part.content}</h3> :
                                <span key={index}>{part.content}</span>
                    ))
                }
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