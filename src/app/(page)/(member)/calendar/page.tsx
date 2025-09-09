import CalendarSection from "@/components/layout/member/calendar/CalendarSection";
import RestrictedContent from "@/components/ui/global/RestrictedContent";
import { Suspense } from "react";

export default function Home() {
    return (
        <div className="flex flex-col space-x-4 lg:flex-row lg:space-y-4 w-full">
            <Suspense>
                <RestrictedContent allowStudent>
                    {
                        Array.from({ length: 3 }).map((_, i) => (
                            <CalendarSection key={i} index={i} />
                        ))
                    }
                </RestrictedContent>
            </Suspense>
        </div>
    )
}