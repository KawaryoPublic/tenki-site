import CalenderSection from "@/components/layout/CalenderSection";
import DefaultLink from "@/components/ui/global/DefaultLink";
import RestrictedContent from "@/components/ui/global/RestrictedContent";
import { Suspense } from "react";

export default function Home() {
    return (
        <div className="flex flex-col space-x-4 lg:flex-row lg:space-y-4 w-full">
            <div className="p-2">
                <Suspense>
                    <RestrictedContent>
                        <DefaultLink href="/calender/edit" className="border p-2">予定の編集</DefaultLink>
                    </RestrictedContent>
                </Suspense>
            </div>
            {
                Array.from({ length: 3 }, (_, i) => i).map(i => (
                    <CalenderSection key={i} index={i} />
                ))
            }
        </div>
    )    
}