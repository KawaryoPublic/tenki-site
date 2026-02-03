"use client";

import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { DateInfo } from "@/lib/types";
import { useState, useEffect } from "react";
import { checkTier } from "@/lib/utils";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import EditDateInfoForm from "@/components/ui/calendar/date_info/Form/EditDateInfoForm";

export default function EditDateInfoSection({ date, tier }: { date: string, tier: number }) {
    const [ info, setInfo ] = useState<DateInfo | null>();
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        fetch(`/api/calendar/date_info?date=${date}`)
            .then(res => res.json())
            .then(data => setInfo(data))
            .finally(() => setLoading(false))
            .catch(err => console.error(err));
    }, []);

    return (
        checkTier(tier) &&
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !info ? <div className="flex-1 flex flex-col items-center font-bold text-xl">詳細を読み込めませんでした</div> :
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <EditDateInfoForm info={info} />
            </WhiteFrameUI>
            <div className="flex flex-col gap-4">
                <div>
                    <BlueButton href="/calendar">日付一覧に戻る</BlueButton>
                </div>
            </div>
        </section>
    );
}