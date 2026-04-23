"use client";

import AddDateInfoForm from "@/components/ui/calendar/date_info/Form/AddDateInfoForm";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { preventRefresh } from "@/lib/utils";
import { useEffect } from "react";

export default function AddDateInfoSection({ date }: { date: string }) {
    useEffect(() => {
        return preventRefresh();
    }, []);

    return (
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <AddDateInfoForm date={date} />
            </WhiteFrameUI>
            <div>
                <BlueButton>
                    <a href="/calendar">カレンダーに戻る</a>
                </BlueButton>
            </div>
        </section>
    );
}