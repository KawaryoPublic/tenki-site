"use client";

import { DateInfo } from "@/lib/type";
import { useEffect, useState } from "react"
import RestrictedContent from "@/components/ui/global/RestrictedContent";
import RestrictedLink from "@/components/ui/global/RestrictedLink";
import EditPlanForm from "@/components/ui/member/calender/date_info/EditPlanForm";
import DeletePlanButton from "@/components/ui/member/calender/date_info/DeletePlanButton";
import BlueButton from "@/components/ui/global/button/BlueButton";

export default function DateInfoSection({ id, q }: { id: number, q: string }) {
    const [ info, setInfo ] = useState<DateInfo>({id: -1, date: ""});

    useEffect(() => {
        fetch("/api/dateInfo")
            .then(res => res.json())
            .then(data => setInfo(data.find((info: DateInfo) => info.id === id)))
            .catch(err => console.error(err));
    }, []);

    return (
        info ? 
        info.id === -1 ? <div>Loading...</div> :
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-2xl">{`${info?.date}`}の詳細ページ</h1>
                <div>
                    予定: <br /> 
                    <span className="whitespace-pre-wrap">{info?.plan ? info.plan : "なし"}</span>
                </div>
            </div>
            <RestrictedContent>
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl">編集</h1>
                    <div className="flex flex-col gap-6">
                        <div>
                            <EditPlanForm info={info} />
                        </div>
                        <div>
                            <DeletePlanButton id={id} q={q} />
                        </div>
                    </div>
                </div>
            </RestrictedContent>
            <div>
                <BlueButton>
                    <RestrictedLink href="/calender">日付一覧に戻る</RestrictedLink>
                </BlueButton>
            </div>
        </div> :
        <div>
            <BlueButton>
                <RestrictedLink href="/calender">日付一覧に戻る</RestrictedLink>
            </BlueButton>
        </div>
    )
}