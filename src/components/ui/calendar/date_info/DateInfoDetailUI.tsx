import { DateInfo } from "@/lib/types";
import WhiteFrameUI from "../../global/WhiteFrameUI";
import { checkTier, formatDate, splitLinksAndHeaders } from "@/lib/utils";
import { useState } from "react"; 
import DeleteDateInfoButton from "./Button/DeleteDateInfoButton";
import Link from "next/link";
import Image from "next/image";

export default function DateInfoDetailUI({ info, tier }: { info: DateInfo, tier: number }) {
    const [ showOptions, setShowOptions ] = useState(false);
    const updatedAt = new Date(info.updatedAt);

    return (
        <WhiteFrameUI className="flex flex-col gap-2">
            <button className={`fixed top-0 right-0 w-full h-full z-1 ${showOptions ? "" : "hidden"}`} onClick={() => setShowOptions(false)} />
            <div className="flex justify-between items-center border-b pb-2">
                <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{formatDate(info.date)}の予定</h2>
                        {
                            checkTier(tier) && 
                                <button 
                                    className="relative w-4 md-[18px] lg:w-5 aspect-square"
                                    onClick={() => setShowOptions(true)}
                                >
                                    <WhiteFrameUI className={`whitespace-nowrap absolute right-0 top-full mt-1 flex flex-col gap-2 md:gap-4 text-sm md:text-base text-gray-800 z-3 ${showOptions ? "" : "hidden"}`}>
                                        <Link href={`/calendar/date_info/edit/${info.date}`} className="hover:underline">編集</Link>
                                        <DeleteDateInfoButton date={info.date} />
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
                <p className="font-bold">予定</p>
                <div className="whitespace-pre-wrap text-sm md:text-base">
                    {
                        !info.plan ? "なし" : 
                        splitLinksAndHeaders(info.plan).map((part, index) => (
                            part.type === "link" ? 
                                <Link key={index} href={part.content} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{part.content}</Link> :
                                part.type === "header" ?
                                    <h3 key={index} className="text-lg md:text-xl font-bold mb-1">{part.content}</h3> :
                                    <span key={index}>{part.content}</span>
                        ))
                    }
                </div>
            </div>
            <div>
                <p className="font-bold">休日観測</p>
                <span className="whitespace-pre-wrap text-sm md:text-base">{info.holiday.length === 0 ? "なし" : info.holiday.join(", ")}</span>
            </div>
        </WhiteFrameUI>
    )
}