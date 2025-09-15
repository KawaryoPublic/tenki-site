import CalendarSection from "@/components/layout/member/calendar/CalendarSection";
import FilterObservation from "@/components/ui/member/calendar/FilterObservation";
import { getPassword } from "@/lib/action";
import { checkPassword } from "@/lib/util";

export default async function Home() {
    const password = await getPassword();

    return (
        <div className="flex-1 flex flex-col gap-4 min-h-full">
            {
                checkPassword(password, false, true) ? 
                <>
                    <div className="flex justify-end">
                        <FilterObservation />
                    </div>
                    <CalendarSection password={password} />
                </> : ""
            }
        </div>
    )
}