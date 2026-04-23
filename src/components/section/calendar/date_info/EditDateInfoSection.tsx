"use client";

import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { DateInfo } from "@/lib/types";
import { useState, useEffect } from "react";
import { checkTier, preventRefresh } from "@/lib/utils";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import EditDateInfoForm from "@/components/ui/calendar/date_info/Form/EditDateInfoForm";
import LoadingResultUI from "@/components/ui/global/LoadingResultUI";

export default function EditDateInfoSection({ date, tier }: { date: string, tier: number }) {
    const [ info, setInfo ] = useState<DateInfo | null>();
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        setLoading(true);
        
        fetch(`/api/calendar/date_info?date=${date}`)
            .then(res => res.json())
            .then(data => setInfo(data))
            .finally(() => setLoading(false))
            .catch(err => console.error(err));

        return preventRefresh();
    }, []);

    return (
        checkTier(tier) &&
        loading ? <LoadingResultUI>Loading...</LoadingResultUI> :
        !info ? <LoadingResultUI>詳細を読み込めませんでした</LoadingResultUI> :
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <EditDateInfoForm info={info} />
            </WhiteFrameUI>
            <div className="flex flex-col gap-4">
                <div>
                    <BlueButton>
                        <a href="/calendar">日付一覧に戻る</a>
                    </BlueButton>
                </div>
            </div>
        </section>
    );
}