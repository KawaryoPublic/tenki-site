import Days from "@/components/ui/member/calender/Days";
import Dates from "@/components/ui/member/calender/Dates";
import { Suspense } from "react";

export default function CalenderSection({index}: { index: number }) {
    return (
        <section className="flex-1 flex flex-col min-h-[50%]">
            <h2 className="flex justify-center item-center font-bold text-xl">{new Date().getMonth() + index + 1}月</h2>
            <Days />
            <Suspense>
                <Dates index={index} />
            </Suspense>
        </section>
    )
}