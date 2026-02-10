import DeleteManualButton from "./Button/DeleteManualButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { checkTier } from "@/lib/utils";
import BlueButton from "../global/Button/BlueButton";
import Link from "next/link";

export default function RoleUI({ role, tier }: { role: string, tier: number }) {
    //const updatedAt = new Date(manual.updatedAt);

    return (
        <WhiteFrameUI className="flex flex-col gap-2">
            <div className={`flex justify-between items-center`}>
                <Link className="text-xl md:text-3xl font-bold" href={`role/0`}>{role}</Link>
                <div className="flex items-center gap-2 md:gap-4">
                    {
                        checkTier(tier) &&
                        <>
                            <BlueButton href={`/role/edit/0`}>編集</BlueButton>
                        </>
                    }
                </div>
            </div>
        </WhiteFrameUI>
    );
}