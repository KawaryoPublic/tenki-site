"use client";

import { DateInfo } from "@/lib/type";
import { Suspense, useEffect, useState } from "react"
import RestrictedContent from "../../ui/global/RestrictedContent";
import DefaultLink from "../../ui/global/DefaultLink";
import EditPlanForm from "@/components/ui/calender/date_info/EditPlanForm";
import DeletePlanButton from "@/components/ui/calender/date_info/DeletePlanButton";

export default function DateInfoSection({ id }: { id: number }) {
    const [ info, setInfo ] = useState<DateInfo>({id: -1, date: ""});

    useEffect(() => {
        fetch("/api/dateInfo").then(res => res.json()).then(data => {
            const info = data.find((info: DateInfo) => info.id === id);

            setInfo(info);
        })
    }, []);

    return (
        info.id === -1 ? <div>Loading...</div> :
        <div>
            <div className="pb-4">
                <h1 className="text-3xl">{`${info?.date}`}の詳細ページ</h1>
                <div>
                    予定: {info?.plan ? info.plan : "なし"}
                </div>
            </div>
            <Suspense>
                <RestrictedContent>
                    <div className="pt-4">
                        <h1 className="text-3xl">編集</h1>
                        <div>
                            <EditPlanForm info={info} />
                        </div>
                        <div>
                            <DeletePlanButton id={id} />
                        </div>
                    </div>
                </RestrictedContent>
            </Suspense>
            <div>
                <DefaultLink href="/calender">日付一覧に戻る</DefaultLink>
            </div>
        </div>
    )
}