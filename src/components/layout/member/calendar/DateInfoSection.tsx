"use client";

import { DateInfo } from "@/lib/type";
import { useEffect, useState } from "react"
import EditPlanForm from "@/components/ui/member/calendar/date_info/EditPlanForm";
import DeleteInfoButton from "@/components/ui/member/calendar/date_info/DeleteInfoButton";
import BlueButton from "@/components/ui/global/button/BlueButton";
import WhiteFrame from "@/components/ui/global/WhiteFrame";
import { checkPassword } from "@/lib/util";
import Link from "next/link";

export default function DateInfoSection({ id, password }: { id: number, password: string }) {
    const [ info, setInfo ] = useState<DateInfo>({id: -1, date: "", plan: "", event: "", holiday: ""});

    useEffect(() => {
        fetch("/api/dateInfo")
            .then(res => res.json())
            .then(data => setInfo(data.find((info: DateInfo) => info.id === Number(id))))
            .catch(err => console.error(err));
    }, []);

    const formatDate = (date: string) => {
        const splitDate = date.split("-");

        return `${splitDate[0]}年${Number(splitDate[1]) + 1}月${splitDate[2]}日`;
    }

    return (
        info.id === -1 ? <div>Loading...</div> :
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl">{formatDate(info.date)}の詳細</h1>
            <WhiteFrame>
                {
                    checkPassword(password) ?
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
                    checkPassword(password) ?
                    <div>
                        <DeleteInfoButton id={id} />
                    </div> : ""
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