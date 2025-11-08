"use client";

import { useEffect, useState } from "react";
import { Notification } from "@/lib/type";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import NotificationDetailUI from "@/components/ui/notification/NotificationDetailUI";

export default function NotificationDetailSection({ id }: { id: number }) {
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
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !notification ? <div className="flex-1 flex flex-col items-center font-bold text-xl">通知を読み込めませんでした</div> :
        <section className="w-full flex flex-col gap-4">
            <NotificationDetailUI notification={notification} />
            <div>
                <BlueButton href="/notification">告知に戻る</BlueButton>
            </div>
        </section>
    )
}