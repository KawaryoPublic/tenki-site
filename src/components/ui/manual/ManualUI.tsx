import DeleteManualButton from "./Button/DeleteManualButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { checkTier } from "@/lib/utils";
import { Manual, TIER } from "@/lib/types";
import BlueButton from "../global/Button/BlueButton";
import Link from "next/link";

export default function ManualUI({ manual, tier }: { manual: Manual, tier: TIER }) {
    const updatedAt = new Date(manual.updatedAt);

    return (
        <WhiteFrameUI className="flex flex-col gap-2">
            <div className={`flex justify-between items-center ${manual.tags.length !== 0 && "border-b pb-2"}`}>
                <Link className="text-xl md:text-3xl font-bold" href={`manual/${manual.id}`}>{manual.title}</Link>
                <div className="flex items-center gap-2 md:gap-4">
                    <span className="text-gray-800 text-xs md:text-sm">{`${updatedAt.getFullYear() === (new Date()).getFullYear() ? "" : `${updatedAt.getFullYear()}年`}${updatedAt.getMonth() + 1}月${updatedAt.getDate()}日`}</span>
                    {
                        checkTier(tier) &&
                        <>
                            <BlueButton href={`/manual/edit/${manual.id}`}>編集</BlueButton>
                            <DeleteManualButton id={manual.id} urls={manual.urls} />
                        </>
                    }
                </div>
            </div>
            <div className="text-xs md:text-sm text-blue-700 font-bold">
                {
                    manual.tags.map((tag, index) => 
                        <Link key={index} href={`/manual?tags=${tag}`} className="mr-2">#{tag}</Link>
                    )
                }
            </div>
        </WhiteFrameUI>
    );
}