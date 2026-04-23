import { getEquipmentId, splitLinksAndHeaders } from "@/lib/utils";
import WhiteFrameUI from "../global/WhiteFrameUI";
import { Equipment, Role } from "@/lib/types";
import OptionUrlUI from "../global/OptionUrlUI";
import Link from "next/link";
import DefaultDetailTitleUI from "../global/DefaultDetailTitleUI";
import DefaultHeadingUI from "../global/DefaultHeadingUI";
import DeleteEquipmentButton from "./Button/DeleteEquipmentButton";
import { EQUIPMENT_TYPES } from "@/lib/const";

export default function EquipmentDetailUI({ equipment, roles, tier }: { equipment: Equipment, roles: Role[], tier: number }) {
    return (
        <WhiteFrameUI className="flex flex-col gap-2">
            <DefaultDetailTitleUI tier={tier} editLink={`/equipment/edit/${equipment.id}`} deleteButton={<DeleteEquipmentButton id={equipment.id} urls={equipment.urls} />} updatedAt={new Date(equipment.updatedAt)} roles={roles} tags={equipment.tags} othersToShow={[EQUIPMENT_TYPES[equipment.type]]} className="border-b pb-2">
                <DefaultHeadingUI>{getEquipmentId(equipment)} {equipment.name}</DefaultHeadingUI>
            </DefaultDetailTitleUI>
            <div className="whitespace-pre-wrap text-sm md:text-base">
                <p className="font-bold">場所</p>
                <Link href={`/storage/${equipment.location.id}?equipment=${equipment.name}`}>{equipment.location.name}</Link>
            </div>
            {
                equipment.number !== 1 && 
                <div className="whitespace-pre-wrap text-sm md:text-base">
                    <p className="font-bold">個数</p>
                    <span>{equipment.count}個</span>
                </div>
            }
            <div className="whitespace-pre-wrap text-sm md:text-base">
                <p className="font-bold">サイズ</p>
                <span>{`${equipment.size[0]}cm × ${equipment.size[1]}cm × ${equipment.size[2]}`}cm</span>
            </div>
            <div className="whitespace-pre-wrap text-sm md:text-base">
               <p className="font-bold">内容物</p>
               <ul>
                   {
                       equipment.contents.map((content, i) => (
                            <li key={i}>
                                <input type="checkbox" className="mr-2" /> {content}
                            </li>
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