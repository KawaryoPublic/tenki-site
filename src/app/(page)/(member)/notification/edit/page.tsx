import NotificationEditSection from "@/components/layout/member/notification/NotificationEditSection";
import RestrictedContent from "@/components/ui/global/RestrictedContent";
import { Suspense } from "react";

export default async function Home({ searchParams }: { searchParams: { q: string } }) {
    return (
        <div className="w-full h-full flex flex-col">
            <Suspense>
                <RestrictedContent>
                    <NotificationEditSection q={(await searchParams).q} />
                </RestrictedContent>
            </Suspense>
        </div>
    )
}