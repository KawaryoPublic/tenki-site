import DateInfoSection from "@/components/layout/member/calendar/DateInfoSection";
import RestrictedContent from "@/components/ui/global/RestrictedContent";
import { Suspense } from "react";

export default async function Home({ params, searchParams }: { params: { id: number }, searchParams: { q: string } }) {
    return (
        <div className="flex-1 flex flex-col">
            <Suspense>
                <RestrictedContent allowStudent>
                    <DateInfoSection id={(await params).id} q={(await searchParams).q} />
                </RestrictedContent>
            </Suspense>
        </div>
    );
}