import { DateInfo } from "@/lib/type";
import WhiteFrameUI from "../global/WhiteFrameUI";

export default function DateInfoDetailUI({ info }: { info: DateInfo }) {
    return (
        <WhiteFrameUI>
            <h2 className="text-xl border-b">詳細</h2>
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