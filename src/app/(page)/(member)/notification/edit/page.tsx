import EditNotificationSection from "@/components/layout/member/notification/EditNotificationSection";
import RestrictedContent from "@/components/ui/global/RestrictedContent";
import { Suspense } from "react";

export default async function Home({ searchParams }: { searchParams: { q: string } }) {
    return (
        <div className="flex-1 flex flex-col">
            <Suspense>
                <RestrictedContent>
                    <EditNotificationSection q={(await searchParams).q} />
                </RestrictedContent>
            </Suspense>
        </div>
    )
}