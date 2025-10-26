"use client";

import WhiteFrame from "@/components/ui/global/WhiteFrame";
import { DateInfo, TIER } from "@/lib/type";
import { useState, useEffect } from "react";
import DeleteInfoButton from "../../ui/calendar/Button/DeleteInfoButton";
import EditDateInfoForm from "../../ui/calendar/Form/EditDateInfoForm";
import { checkTier } from "@/lib/util";
import DateInfoDetailUI from "@/components/ui/calendar/DateInfoDetailUI";
import BlueButton from "@/components/ui/global/Button/BlueButton";

export default function DateInfoSection({ date, tier }: { date: string, tier: TIER }) {
    const [ info, setInfo ] = useState<DateInfo>({date: "", plan: "", event: "", holiday: ""});
    
    useEffect(() => {
        fetch("/api/date_info")
            .then(res => res.json())
            .then(data => setInfo(data.find((info: DateInfo) => info.date === date)))
            .catch(err => console.error(err));
    }, []);

    const formatDate = (date: string) => {
        const splitDate = date.split("-");

        return `${splitDate[0]}年${Number(splitDate[1]) + 1}月${splitDate[2]}日`;
    }

    return (
        checkTier(tier, false, true) &&
        info.date === "" ? <div className="text-lg">Loading...</div> :
        <section className="w-full flex flex-col gap-4">
            <h1 className="text-2xl">{formatDate(info.date)}の詳細</h1>
            {
                checkTier(tier) ?
                    <WhiteFrame>
                        <h2 className="text-xl border-b">詳細</h2>
                        <div>
                            <EditDateInfoForm info={info} />
                        </div>
                    </WhiteFrame> :
                    <DateInfoDetailUI info={info} />
            }
            <div className="flex flex-col gap-4">
                {
                    checkTier(tier) &&
                    <div>
                        <DeleteInfoButton date={date} />
                    </div>
                }
                <div>
                    <BlueButton href="/calendar">日付一覧に戻る</BlueButton>
                </div>
            </div>
        </section>
    );
}