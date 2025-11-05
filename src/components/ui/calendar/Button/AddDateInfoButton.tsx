import { TIER } from "@/lib/type";
import { checkTier, formatDate } from "@/lib/util";

export default function AddDateInfoButton({ date, tier }: { date: Date, tier: TIER }) {
    return (
        <button
            className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
            onClick={async () => {
                if(!checkTier(tier)) return;
                if(!confirm(`${formatDate(date)}に予定を追加しますか？`)) return;

                redirect(`/calendar/add/${date}`);
            }}
        >
            {date.getDate()}
        </button>
    )
}