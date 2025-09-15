"use client";

import Notification from "@/components/ui/member/notification/Notification";
import { NotificationType } from "@/lib/type";
import { useState, useEffect } from "react";

export default function NotificationSection({ password }: { password: string }) {
    const [ notifications, setNotifications ] = useState<NotificationType[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        fetch("/api/notifications")
            .then(res => res.json())
            .then(data => setNotifications(data))
            .finally(() => setLoading(false))
            .catch(err => console.error(err))
    }, []);

    return (
        <section className="flex-1 flex flex-col min-h-[50%] w-full">
            {
                loading ? <div>Loading...</div> :
                notifications.length === 0 ? (
                    <div className="flex-1 flex flex-col justify-center items-center">
                        通知はありません
                    </div>
                ) : 
                notifications.map((notification, index) => (
                    <div key={index} className="mb-4">
                        <Notification id={notification.id} title={notification.title} createdAt={notification.createdAt} content={notification.content} password={password} />
                    </div>
                ))
            }
        </section>
    )
}
