import { DateInfo, TIER } from "@/lib/types";
import WhiteFrameUI from "../global/WhiteFrameUI";
import { checkTier, formatDate, splitLinksAndHeaders } from "@/lib/utils";
import BlueButton from "../global/Button/BlueButton";
import DeleteDateInfoButton from "./Button/DeleteDateInfoButton";
import Link from "next/link";

export default function DateInfoDetailUI({ info, tier }: { info: DateInfo, tier: TIER }) {
    return (
        <WhiteFrameUI className="flex flex-col gap-2">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl md:text-3xl font-bold">{formatDate(info.date)}の詳細</h2>
                <div className="flex items-center gap-2 md:gap-4">
                    {
                        checkTier(tier) && 
                        <>
                            <BlueButton href={`/calendar/date/edit/${info.date}`}>編集</BlueButton>
                            <DeleteDateInfoButton date={info.date} />
                        </>
                    }
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
                                    <h3 key={index} className="text-lg md:text-xl font-bold mb-2">{part.content}</h3> :
                                    <span key={index}>{part.content}</span>
                        ))
                    }
                </div>
            </div>
            <div>
                <p className="font-bold">休日観測</p>
                <div className="whitespace-pre-wrap text-sm md:text-base">{info.holiday.length === 0 ? "なし" : info.holiday.join(", ")}</div>
            </div>
        </WhiteFrameUI>
    )
}