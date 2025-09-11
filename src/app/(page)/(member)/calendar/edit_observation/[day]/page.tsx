import { Suspense } from "react";
import EditObservationSection from "@/components/layout/member/calendar/EditObservationSection";
import RestrictedContent from "@/components/ui/global/RestrictedContent";

export default function Home({ params }: { params: { day: string } }) {
    return (
        <div className="w-full flex flex-col">
            <Suspense>
                <RestrictedContent>
                    <EditObservationSection day={Number(params.day)} />
                </RestrictedContent>
            </Suspense>
        </div>
    );
}