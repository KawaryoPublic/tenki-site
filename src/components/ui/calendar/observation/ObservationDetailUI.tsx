import { Observation } from "@/lib/types";
import WhiteFrameUI from "../../global/WhiteFrameUI";
import { DAYS } from "@/lib/const";
import { checkTier } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ObservationDetailUI({ observation, tier }: { observation: Observation, tier: number }) {
    const [ showOptions, setShowOptions ] = useState(false);
    const updatedAt = new Date(observation.updatedAt);

    return (
        <WhiteFrameUI className="flex flex-col gap-2">
            <button className={`fixed top-0 right-0 w-full h-full z-1 ${showOptions ? "" : "hidden"}`} onClick={() => setShowOptions(false)} />
            <div className="flex justify-between items-center border-b pb-2">
                <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{DAYS[observation.day]}曜日の観測シフト</h2>
                        {
                            checkTier(tier) && 
                                <button 
                                    className="relative w-4 md-[18px] lg:w-5 aspect-square"
                                    onClick={() => setShowOptions(true)}
                                >
                                    <WhiteFrameUI className={`whitespace-nowrap absolute right-0 top-full mt-1 flex flex-col gap-2 md:gap-4 text-sm md:text-base text-gray-800 z-3 ${showOptions ? "" : "hidden"}`}>
                                        <Link href={`/calendar/observation/edit/${observation.day}`} className="hover:underline">編集</Link>
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
            <div>
                <p className="font-bold">朝</p>
                <p className="whitespace-pre-wrap">{observation.morning.length === 0 ? "なし" : observation.morning.join(", ")}</p>
            </div>
            <div>
                <p className="font-bold">昼</p>
                <p className="whitespace-pre-wrap">{observation.noon.length === 0 ? "なし" : observation.noon.join(", ")}</p>
            </div>
            <div>
                <p className="font-bold">放課後</p>
                <p className="whitespace-pre-wrap">{observation.afterSchool.length === 0 ? "なし" : observation.afterSchool.join(", ")}</p>
            </div>
        </WhiteFrameUI>
    )
}