"use client";

import BlueButton from "@/components/ui/Button/BlueButton";
import WhiteFrame from "@/components/ui/WhiteFrame";
import { DateInfo, TIER } from "@/lib/type";
import { useState, useEffect } from "react";
import DeleteInfoButton from "./DeleteInfoButton";
import EditPlanForm from "./EditPlanForm";
import { checkTier } from "@/lib/util";
import Link from "next/link";

export default function DateInfoSection({ date, tier }: { date: string, tier: TIER }) {
    const [ info, setInfo ] = useState<DateInfo>({date: "", plan: "", event: "", holiday: ""});
    
    useEffect(() => {
        fetch("/api/dateInfo")
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
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl">{formatDate(info.date)}の詳細</h1>
            <WhiteFrame>
                {
                    checkTier(tier) ?
                    <>
                        <h2 className="text-xl border-b">詳細</h2>
                        <div>
                            <EditPlanForm info={info} />
                        </div>
                    </> :
                    <>
                        <h2 className="text-xl border-b">詳細</h2>
                        <div>
                            <p className="font-bold">予定</p>
                            <p className="whitespace-pre-wrap">{info.plan ? info.plan : "なし"}</p>
                        </div>
                        <div>
                            <p className="font-bold">イベント</p>
                            <p className="whitespace-pre-wrap">{info.event ? info.event : "なし"}</p>
                        </div>
                        <div>
                            <p className="font-bold">休日観測</p>
                            <p className="whitespace-pre-wrap">{info.holiday ? info.holiday : "なし"}</p>
                        </div>
                    </>
                }
            </WhiteFrame>
            <div className="flex flex-col gap-4">
                {
                    checkTier(tier) &&
                    <div>
                        <DeleteInfoButton date={date} />
                    </div>
                }
                <div>
                    <BlueButton>
                        <Link href="/calendar">日付一覧に戻る</Link>
                    </BlueButton>
                </div>
            </div>
        </div>
    );
}