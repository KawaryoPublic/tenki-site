import DeleteManualButton from "./Button/DeleteManualButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { checkTier } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Manual, Role } from "@/lib/types";

export default function ManualUI({ manual, roles, tier }: { manual: Manual, roles: Role[], tier: number }) {
    const [ showOptions, setShowOptions ] = useState(false);
    const updatedAt = new Date(manual.updatedAt);

    return (
        <WhiteFrameUI className="flex justify-between items-center">
            <button className={`fixed top-0 right-0 w-full h-full z-1 ${showOptions ? "" : "hidden"}`} onClick={() => setShowOptions(false)} />
            <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between">
                    <Link className="text-xl md:text-2xl lg:text-3xl font-bold z-2" href={`/manual/${manual.id}`}>{manual.title}</Link>
                    {
                        checkTier(tier) && 
                            <button 
                                className="relative w-4 md-[18px] lg:w-5 aspect-square"
                                onClick={() => setShowOptions(true)}
                            >
                                <WhiteFrameUI className={`whitespace-nowrap absolute right-0 top-full mt-1 flex flex-col gap-2 md:gap-4 text-sm md:text-base text-gray-800 z-3 ${showOptions ? "" : "hidden"}`}>
                                    <Link href={`/manual/edit/${manual.id}`} className="hover:underline">編集</Link>
                                    <DeleteManualButton id={manual.id} urls={manual.urls} />
                                </WhiteFrameUI>
                                <Image src="/image/3_points.webp" alt="Options" fill priority className="w-full h-full cursor-pointer" />
                            </button>
                    }
                </div>
                <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                    <span className="text-gray-800 text-xs md:text-sm">{`${updatedAt.getFullYear() === (new Date()).getFullYear() ? "" : `${updatedAt.getFullYear()}年`}${updatedAt.getMonth() + 1}月${updatedAt.getDate()}日更新`}</span>
                    {
                        manual.roles.length > 0 &&
                        <div className="text-gray-800 text-xs md:text-sm flex gap-1 md:gap-2 flex-wrap">
                            {
                                manual.roles.map((id, index) => 
                                    <Link key={index} href={`/manual?role=${id}`} className="z-2">{`${roles.find(r => r.id === id)?.name}`}</Link>
                                )
                            }
                        </div>
                    }
                    {
                        manual.tags.length > 0 &&
                        <div className="text-xs md:text-sm font-bold flex gap-1 md:gap-2 flex-wrap">
                            {
                                manual.tags.map((tag, index) => 
                                    <Link key={index} href={`/manual?tags=${tag}`} className="text-blue-700 z-2">#{tag}</Link>
                                )
                            }
                        </div>
                    }
                </div>
            </div>
        </WhiteFrameUI>
    );
}