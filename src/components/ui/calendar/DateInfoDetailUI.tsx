import { DateInfo, TIER } from "@/lib/type";
import WhiteFrameUI from "../global/WhiteFrameUI";
import { checkTier, formatDate } from "@/lib/util";
import BlueButton from "../global/Button/BlueButton";

export default function DateInfoDetailUI({ info, tier }: { info: DateInfo, tier: TIER }) {
    return (
        <WhiteFrameUI className="flex flex-col gap-2">
            <div className="flex justify-between items-center border-b">
                <h2 className="text-lg lg:text-xl">{formatDate(info.date)}の詳細</h2>
                <div>
                    {
                        checkTier(tier) && <BlueButton href={`/calendar/date/edit/${info.date}`}>編集</BlueButton>
                    }
                </div>
            </div>
            <div>
                <p className="font-bold">予定</p>
                <p className="whitespace-pre-wrap">{info.plan ? info.plan : "なし"}</p>
            </div>
            <div>
                <p className="font-bold">イベント</p>
                <p className="whitespace-pre-wrap">{info.event ? info.event : "なし"}</p>
            </div>
            <div>
                <p className="font-bold">休日観測</p>
                <p className="whitespace-pre-wrap">{info.holiday.length === 0 ? "なし" : info.holiday.join(", ")}</p>
            </div>
        </WhiteFrameUI>
    )
}