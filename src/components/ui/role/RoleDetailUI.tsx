import Image from "next/image";
import WhiteFrameUI from "../global/WhiteFrameUI";
import BlueButton from "../global/Button/BlueButton";
import { Role } from "@/lib/types";
import { checkTier } from "@/lib/utils";
import DeleteRoleButton from "./Button/DeleteRoleButton";

export default function RoleDetailUI({ role, tier }: { role: Role, tier: number }) {
    return (
        <WhiteFrameUI className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl md:text-3xl font-bold">{role.name}とは？</h2>
                <div className="flex items-center gap-2 md:gap-4">
                {
                    checkTier(tier) && 
                    <>
                        <BlueButton href={`/role/edit/${role.id}`}>編集</BlueButton>
                        <DeleteRoleButton id={role.id} />
                    </>
                }
                </div>
            </div>
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