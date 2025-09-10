"use client";

import { DateInfo } from "@/lib/type";
import { useEffect, useState } from "react"
import RestrictedContent from "@/components/ui/global/RestrictedContent";
import RestrictedLink from "@/components/ui/global/RestrictedLink";
import EditPlanForm from "@/components/ui/member/calendar/date_info/EditPlanForm";
import DeleteInfoButton from "@/components/ui/member/calendar/date_info/DeleteInfoButton";
import BlueButton from "@/components/ui/global/button/BlueButton";
import EditObservationForm from "@/components/ui/member/calendar/date_info/EditObservationForm";

export default function DateInfoSection({ id, q }: { id: number, q: string }) {
    const [ info, setInfo ] = useState<DateInfo>({id: -1, date: ""});

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
        <div>
            <h1 className="text-2xl">{formatDate(info.date)}の予定</h1>
            <div className="pb-8 flex flex-row">
                <div className="flex flex-1 flex-col gap-4 border-r pr-2">
                    <div>
                        予定: <br /> 
                        <span className="whitespace-pre-wrap">{info.plan ? info.plan : "なし"}</span>
                    </div>
                    <RestrictedContent>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-xl">編集</h1>
                            <div>
                                <EditPlanForm info={info} />
                            </div>
                        </div>
                    </RestrictedContent>
                </div>
                <div className="flex flex-1 flex-col gap-4 border-l pl-2">
                    <div>
                        観測: <br />
                        {
                            info.observation ?
                            `朝 = ${info.observation.morning} | 昼 = ${info.observation.noon} | 放課後 = ${info.observation.afterSchool}` :
                            "なし" 
                        }
                    </div>
                    <RestrictedContent>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-xl">編集</h1>
                            <div>
                                <EditObservationForm info={info} />
                            </div>
                        </div>
                    </RestrictedContent>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div>
                    <DeleteInfoButton id={id} q={q} />
                </div>
                <div>
                    <BlueButton>
                        <RestrictedLink href="/calendar">日付一覧に戻る</RestrictedLink>
                    </BlueButton>
                </div>
            </div>
        </div>
    );
}