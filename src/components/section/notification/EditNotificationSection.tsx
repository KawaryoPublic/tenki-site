"use client";

import { useEffect, useState } from "react";
import { Notification, TIER } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import EditNotificationForm from "@/components/ui/notification/Form/EditNotificationForm";
import { checkTier } from "@/lib/utils";

export default function EditNotificationSection({ id, tier }: { id: number, tier: TIER }) {
    const [ notification, setNotification ] = useState<Notification | null>();
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        fetch(`/api/notification?id=${id}`)
            .then(res => res.json())
            .then(data => setNotification(data))
            .finally(() => setLoading(false))
            .catch(err => console.error(err))
    }, []);

    return (
        checkTier(tier) &&
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !notification ? <div className="flex-1 flex flex-col items-center font-bold text-xl">通知を読み込めませんでした</div> :
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <EditNotificationForm notification={notification} />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/notification">告知に戻る</BlueButton>
            </div>
        </section>
    )
}