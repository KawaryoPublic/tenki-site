import { checkTier, splitLinksAndHeaders } from "@/lib/utils";
import BlueButton from "../global/Button/BlueButton";
import WhiteFrameUI from "../global/WhiteFrameUI";
import { Equipment, Role } from "@/lib/types";
import OptionUrlUI from "../global/OptionUrlUI";
import DeleteEquipmentButton from "./Button/DeleteEquipmentButton";
import Link from "next/link";

export default function EquipmentDetailUI({ equipment, roles, tier }: { equipment: Equipment, roles: Role[], tier: number }) {
    const updatedAt = new Date(equipment.updatedAt);

    return (
        <WhiteFrameUI className="flex flex-col gap-2">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl md:text-3xl font-bold">{equipment.name}</h2>
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="flex items-center gap-1 md:gap-2 max-sm:hidden">
                        <span className="text-gray-800 text-xs md:text-sm">{`${updatedAt.getFullYear() === (new Date()).getFullYear() ? "" : `${updatedAt.getFullYear()}年`}${updatedAt.getMonth() + 1}月${updatedAt.getDate()}日`}</span>
                        <span className="text-gray-800 text-xs md:text-sm">{`${equipment.roles.map(id => roles.find(r => r.id === id)?.name).join(",")}`}</span>
                    </div>
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
                <Link href={`/storage/${equipment.location.id}?equipment=${equipment.name}`} className="text-blue-500 underline">{equipment.location.name}</Link>
            </div>
            <div className="whitespace-pre-wrap text-sm md:text-base">
                <p className="font-bold">個数</p>
                <span>{equipment.number}個</span>
            </div>
            <div className="whitespace-pre-wrap text-sm md:text-base">
                <p className="font-bold">サイズ</p>
                <span>{`${equipment.size[0]}cm × ${equipment.size[1]}cm × ${equipment.size[2]}`}cm</span>
            </div>
            <div className="whitespace-pre-wrap text-sm md:text-base">
               <p className="font-bold">内容物</p>
               <ul>
                   {
                       equipment.contents.map((content, i) => (
                           <li key={i}>・{content}</li>
                       ))
                   }
               </ul>
           </div>
           <div className="whitespace-pre-wrap text-sm md:text-base">
               <p className="font-bold">説明</p>
               <div>
               {
                   !equipment.description ? "なし" :
                   splitLinksAndHeaders(equipment.description).map((part, index) => (
                       part.type === "link" ?
                           <Link key={index} href={part.content} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{part.content}</Link> :
                           part.type === "header" ?
                               <h3 key={index} className="text-lg md:text-xl font-bold mb-1">{part.content}</h3> :
                               <span key={index}>{part.content}</span>
                   ))
               }
               </div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-sm md:text-base">
               {
                   equipment.urls.map((url, index) => (
                       <OptionUrlUI key={index} url={url} label={equipment.filenames[index]} className="py-2" />
                   ))
               }
           </div>
        </WhiteFrameUI>
    )
}