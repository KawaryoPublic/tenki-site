import { checkTier } from "@/lib/utils";
import Image from "next/image";
import WhiteFrameUI from "./WhiteFrameUI";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { Role } from "@/lib/types";

export default function DefaultDetailTitleUI({ children, tier, editLink, deleteButton, updatedAt, roles = [], tags = [], othersToShow = [], className = "" }: { children: ReactNode, tier: number, editLink: string, deleteButton: ReactNode, updatedAt: Date, roles?: Role[], tags?: string[], othersToShow?: string[], className?: string }) { 
    const [ showOptions, setShowOptions ] = useState(false);

    return (
        <div className={`w-full flex justify-between items-center ${className}`}>
            <button className={`fixed top-0 right-0 w-full h-full z-1 ${showOptions ? "" : "hidden"}`} onClick={() => setShowOptions(false)} />
            <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between">
                    {children}
                    {
                        checkTier(tier) && 
                            <button 
                                className="relative w-4 md-[18px] lg:w-5 aspect-square"
                                onClick={() => setShowOptions(true)}
                            >
                                <WhiteFrameUI className={`whitespace-nowrap absolute right-0 top-full mt-1 flex flex-col gap-2 md:gap-4 text-sm md:text-base text-gray-800 z-3 ${showOptions ? "" : "hidden"}`}>
                                    <Link href={editLink} className="hover:underline">編集</Link>
                                    {deleteButton}
                                </WhiteFrameUI>
                                <Image src="/image/3_points.webp" alt="Options" fill priority className="w-full h-full cursor-pointer" />
                            </button>
                    }
                </div>
                <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                    <span className="text-gray-800 text-xs md:text-sm">{`${updatedAt.getFullYear() === (new Date()).getFullYear() ? "" : `${updatedAt.getFullYear()}年`}${updatedAt.getMonth() + 1}月${updatedAt.getDate()}日更新`}</span>
                    {
                        othersToShow.length > 0 && <span className="text-gray-800 text-xs md:text-sm flex gap-1 md:gap-2 flex-wrap">{othersToShow.join(", ")}</span>
                    }
                    {
                            roles.length > 0 &&
                            <div className="text-gray-800 text-xs md:text-sm flex gap-1 md:gap-2 flex-wrap">
                                {
                                    roles.map((role, index) => 
                                        <Link key={index} href={`/equipment?role=${role.id}`} className="z-2 hover:underline">{`${role.name}`}</Link>
                                    )
                                }
                            </div>
                        }
                        {
                            tags.length > 0 &&
                            <div className="text-xs md:text-sm font-bold flex gap-1 md:gap-2 flex-wrap">
                                {
                                    tags.map((tag, index) => 
                                        <Link key={index} href={`/equipment?tags=${tag}`} className="text-blue-700 decoration-blue-700 z-2 hover:underline">#{tag}</Link>
                                    )
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
    );
}