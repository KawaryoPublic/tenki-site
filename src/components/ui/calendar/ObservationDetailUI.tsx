import { Observation } from "@/lib/type";
import WhiteFrame from "../global/WhiteFrame";

export default function ObservationDetailUI({ observation }: { observation: Observation }) {
    return (
        <WhiteFrame>
            <h2 className="text-xl border-b">観測</h2>
            <div>
                <p className="font-bold">朝</p>
                <p className="whitespace-pre-wrap">{observation.morning ? observation.morning : "なし"}</p>
            </div>
            <div>
                <p className="font-bold">昼</p>
                <p className="whitespace-pre-wrap">{observation.noon ? observation.noon : "なし"}</p>
            </div>
            <div>
                <p className="font-bold">放課後</p>
                <p className="whitespace-pre-wrap">{observation.afterSchool ? observation.afterSchool : "なし"}</p>
            </div>
        </WhiteFrame>
    )
}