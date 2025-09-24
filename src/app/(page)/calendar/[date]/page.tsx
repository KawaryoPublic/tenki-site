"use client";

import { DateInfo } from "@/lib/type";
import { useEffect, useState } from "react"
import EditPlanForm from "@/components/feature/calendar/date_info/EditPlanForm";
import DeleteInfoButton from "@/components/feature/calendar/date_info/DeleteInfoButton";
import BlueButton from "@/components/ui/Button/BlueButton";
import WhiteFrame from "@/components/ui/WhiteFrame";
import Link from "next/link";
import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";

export default async function Home({ params }: { params: { date: string } }) {
    const [ info, setInfo ] = useState<DateInfo>({date: "", plan: "", event: "", holiday: ""});
    const tier = await getTier();

    useEffect(() => {
        fetch("/api/dateInfo")
            .then(res => res.json())
            .then(data => setInfo(data.find((info: DateInfo) => info.date === params.date)))
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
                        <DeleteInfoButton date={params.date} />
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