import { Observation, TIER } from "@/lib/type";
import WhiteFrameUI from "../global/WhiteFrameUI";
import { DAYS } from "@/lib/const";
import BlueButton from "../global/Button/BlueButton";
import { checkTier } from "@/lib/util";

export default function ObservationDetailUI({ observation, tier }: { observation: Observation, tier: TIER }) {
    return (
        <WhiteFrameUI className="flex flex-col gap-2">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl lg:text-3xl font-bold">{DAYS[observation.day]}曜日の観測シフト</h2>
                <div>
                    {
                        checkTier(tier) && <BlueButton href={`/calendar/observation/edit/${observation.day}`}>編集</BlueButton>
                    }
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