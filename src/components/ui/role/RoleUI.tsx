import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { checkTier } from "@/lib/utils";
import BlueButton from "../global/Button/BlueButton";
import Link from "next/link";
import DeleteRoleButton from "./Button/DeleteRoleButton";
import { Role } from "@/lib/types";

export default function RoleUI({ role, tier }: { role: Role, tier: number }) {
    const updatedAt = new Date(role.updatedAt);

    return (
        <WhiteFrameUI className="flex flex-col gap-2">
            <div className={`flex justify-between items-center`}>
                <Link className="text-xl md:text-3xl font-bold" href={`role/${role.id}`}>{role.name}</Link>
                <div className="flex items-center gap-2 md:gap-4">
                    <span className="text-gray-800 text-xs md:text-sm">{`${updatedAt.getFullYear() === (new Date()).getFullYear() ? "" : `${updatedAt.getFullYear()}年`}${updatedAt.getMonth() + 1}月${updatedAt.getDate()}日`}</span>
                    {
                        checkTier(tier) &&
                        <>
                            <BlueButton href={`/role/edit/${role.id}`}>編集</BlueButton>
                            <DeleteRoleButton id={role.id} />
                        </>
                    }
                </div>
            </div>
        </WhiteFrameUI>
    );
}