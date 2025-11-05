import { Observation } from "@/lib/type";
import WhiteFrameUI from "../global/WhiteFrameUI";

export default function ObservationDetailUI({ observation }: { observation: Observation }) {
    return (
        <WhiteFrameUI>
            <h2 className="text-xl border-b">観測</h2>
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