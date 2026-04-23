import Image from "next/image";
import WhiteFrameUI from "../global/WhiteFrameUI";
import { Role } from "@/lib/types";
import DeleteRoleButton from "./Button/DeleteRoleButton";
import DefaultHeadingUI from "../global/DefaultHeadingUI";
import DefaultDetailTitleUI from "../global/DefaultDetailTitleUI";

export default function RoleDetailUI({ role, tier }: { role: Role, tier: number }) {;

    return (
        <WhiteFrameUI className="flex flex-col gap-4">
            <DefaultDetailTitleUI tier={tier} editLink={`/role/edit/${role.id}`} deleteButton={<DeleteRoleButton id={role.id} urls={[role.markUrl, role.personImageUrl]} />} updatedAt={new Date(role.updatedAt)} className="border-b pb-2">
                <DefaultHeadingUI>{role.name}</DefaultHeadingUI>
            </DefaultDetailTitleUI>
            <div className="flex items-center gap-4">
                <div className="w-[20%] md:w-[12%] max-w-25 h-full min-h-25 relative">
                    <Image src={role.markUrl} alt="Role Mark" fill priority className="object-contain" />
                </div>
                <div className="flex-1 text-sm md:text-base whitespace-pre-wrap">
                    <p>{role.description}</p>
                </div>
            </div>
            <div className="flex justify-between items-center border-b pt-8 pb-2">
                <h2 className="text-xl md:text-3xl font-bold">現{role.name}チーフ</h2>
            </div>
            <h3 className="md:text-xl font-bold">{role.person}</h3>
            <div className="flex items-center gap-4">
                <div className="w-[20%] md:w-[12%] max-w-25 h-full min-h-25 relative">
                    <Image src={role.personImageUrl} alt="Person Image" fill priority className="object-contain" />
                </div>
                <div className="flex-1 text-sm md:text-base whitespace-pre-wrap">
                    <p>{role.personDetail}</p>
                </div>
            </div>
        </WhiteFrameUI>
    );
}