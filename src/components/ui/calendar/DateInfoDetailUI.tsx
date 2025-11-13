import { DateInfo, TIER } from "@/lib/types";
import WhiteFrameUI from "../global/WhiteFrameUI";
import { checkTier, formatDate } from "@/lib/utils";
import BlueButton from "../global/Button/BlueButton";
import DeleteDateInfoButton from "./Button/DeleteDateInfoButton";

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
                <p className="whitespace-pre-wrap">{info.plan ? info.plan : "なし"}</p>
            </div>
            <div>
                <p className="font-bold">休日観測</p>
                <p className="whitespace-pre-wrap">{info.holiday.length === 0 ? "なし" : info.holiday.join(", ")}</p>
            </div>
        </WhiteFrameUI>
    )
}