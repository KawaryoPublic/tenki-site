import { TIER } from "@/lib/type";
import { checkTier } from "@/lib/util";
import { redirect } from "next/navigation";

export default function AddDateInfoButton({ date, tier }: { date: Date, tier: TIER }) {
    return (
        <button
            className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
            onClick={async () => {
                if(!checkTier(tier)) return;
                if(!confirm("予定を追加しますか？")) return;

                redirect(`/calendar/add/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
            }}
        >
            {date.getDate()}
        </button>
    )
}