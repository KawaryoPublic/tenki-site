import { TIER } from "@/lib/type";
import { checkTier } from "@/lib/util";

export default function AddDateInfoButton({ date, tier }: { date: Date, tier: TIER }) {
    return (
        <button
            className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
            onClick={async () => {
                if(!checkTier(tier)) return;
                if(!confirm("予定を追加しますか？")) return;

                await fetch("/api/date_info", {
                    method: "POST",
                    body: JSON.stringify({
                        date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
                    }),
                }).then(() => window.location.reload())
                .catch(err => console.log(err));
            }}
        >
            {date.getDate()}
        </button>
    )
}