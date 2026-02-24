import Image from "next/image";
import WhiteFrameUI from "../global/WhiteFrameUI";
import { Role } from "@/lib/types";
import { checkTier } from "@/lib/utils";
import DeleteRoleButton from "./Button/DeleteRoleButton";
import Link from "next/link";
import { useState } from "react";

export default function RoleDetailUI({ role, tier }: { role: Role, tier: number }) {
    const [ showOptions, setShowOptions ] = useState(false);
    const updatedAt = new Date(role.updatedAt);

    return (
        <WhiteFrameUI className="flex flex-col gap-4">
            <button className={`fixed top-0 right-0 w-full h-full z-1 ${showOptions ? "" : "hidden"}`} onClick={() => setShowOptions(false)} />
            <div className="flex justify-between items-center border-b pb-2">
                <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{role.name}</h2>
                        {
                            checkTier(tier) && 
                                <button 
                                    className="relative w-4 md-[18px] lg:w-5 aspect-square"
                                    onClick={() => setShowOptions(true)}
                                >
                                    <WhiteFrameUI className={`whitespace-nowrap absolute right-0 top-full mt-1 flex flex-col gap-2 md:gap-4 text-sm md:text-base text-gray-800 z-3 ${showOptions ? "" : "hidden"}`}>
                                        <Link href={`/role/edit/${role.id}`} className="hover:underline">編集</Link>
                                        <DeleteRoleButton id={role.id} urls={[role.markUrl, role.personImageUrl]} />
                                    </WhiteFrameUI>
                                    <Image src="/image/3_points.webp" alt="Options" fill priority className="w-full h-full cursor-pointer" />
                                </button>
                        }
                    </div>
                    <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                        <span className="text-gray-800 text-xs md:text-sm">{`${updatedAt.getFullYear() === (new Date()).getFullYear() ? "" : `${updatedAt.getFullYear()}年`}${updatedAt.getMonth() + 1}月${updatedAt.getDate()}日更新`}</span>
                    </div>
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