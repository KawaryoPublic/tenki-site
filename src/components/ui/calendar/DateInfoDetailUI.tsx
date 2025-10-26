import { DateInfo } from "@/lib/type";
import WhiteFrame from "../global/WhiteFrame";

export default function DateInfoDetailUI({ info }: { info: DateInfo }) {
    return (
        <WhiteFrame>
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
                <p className="whitespace-pre-wrap">{info.holiday ? info.holiday : "なし"}</p>
            </div>
        </WhiteFrame>
    )
}