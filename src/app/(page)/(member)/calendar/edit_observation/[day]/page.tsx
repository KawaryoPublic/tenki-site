import { Suspense } from "react";
import EditObservationSection from "@/components/layout/member/calendar/EditObservationSection";
import RestrictedContent from "@/components/ui/global/RestrictedContent";

export default function Home({ params }: { params: { day: string } }) {
    return (
        <div className="flex-1 flex flex-col">
            <Suspense>
                <RestrictedContent allowStudent>
                    <EditObservationSection day={Number(params.day)} />
                </RestrictedContent>
            </Suspense>
        </div>
    );
}