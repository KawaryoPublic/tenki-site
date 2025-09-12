import CalendarSection from "@/components/layout/member/calendar/CalendarSection";
import RestrictedContent from "@/components/ui/global/RestrictedContent";
import FilterObservation from "@/components/ui/member/calendar/FilterObservation";
import { Suspense } from "react";

export default function Home() {
    return (
        <div className="w-full flex flex-col gap-4 min-h-full">
            <Suspense>
                <RestrictedContent allowStudent>
                    <div className="flex justify-end">
                        <FilterObservation />
                    </div>
                    <CalendarSection />
                </RestrictedContent>
            </Suspense>
        </div>
    )
}