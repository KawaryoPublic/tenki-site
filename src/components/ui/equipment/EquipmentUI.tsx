import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { Equipment, Role } from "@/lib/types";
import DeleteEquipmentButton from "./Button/DeleteEquipmentButton";
import DefaultDetailTitleUI from "../global/DefaultDetailTitleUI";
import Link from "next/link";
import DefaultHeadingUI from "../global/DefaultHeadingUI";
import { EQUIPMENT_TYPES } from "@/lib/const";

export default function EquipmentUI({ equipment, roles, tier }: { equipment: Equipment, roles: Role[], tier: number }) {
    return (
        <WhiteFrameUI className="flex justify-between items-center">
            <DefaultDetailTitleUI tier={tier} editLink={`/equipment/edit/${equipment.id}`} deleteButton={<DeleteEquipmentButton id={equipment.id} urls={equipment.urls} />} updatedAt={new Date(equipment.updatedAt)} roles={roles} tags={equipment.tags} othersToShow={[EQUIPMENT_TYPES[equipment.type]]}>
                <DefaultHeadingUI>
                    <Link href={`/equipment/${equipment.id}`}>{equipment.name}</Link>
                </DefaultHeadingUI>
            </DefaultDetailTitleUI>
        </WhiteFrameUI>
    );
}