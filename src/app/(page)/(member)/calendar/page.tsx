import CalendarSection from "@/components/layout/member/calendar/CalendarSection";
import RestrictedContent from "@/components/ui/global/RestrictedContent";
import { Suspense } from "react";

export default function Home() {
    return (
        <div className="w-full min-h-full">
            <Suspense>
                <RestrictedContent allowStudent>
                    <CalendarSection />
                </RestrictedContent>
            </Suspense>
        </div>
    )
}