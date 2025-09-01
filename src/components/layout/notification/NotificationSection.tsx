"use client";

import Notification from "@/components/ui/notification/Notification";
import { NotificationType } from "@/lib/type";
import { useState, useEffect } from "react"

export default function NotificationSection() {
    const [ notifications, setNotifications ] = useState<NotificationType[]>([]);

    useEffect(() => {
        fetch("/api/notifications")
            .then(res => res.json())
            .then(data => setNotifications(data))
            .catch(err => console.error(err))
    }, []);

    return (
        <section className="flex-1 flex flex-col min-h-[50%]">
            <h2 className="flex justify-center item-center font-bold">通知</h2>
            {
                notifications.length === 0 ? (
                    <div className="flex-1 flex flex-col justify-center items-center">
                        通知はありません
                    </div>
                ) : 
                notifications.map((notification, index) => (
                    <div key={index} className="mb-4">
                        <Notification title={notification.title} createdAt={notification.createdAt} content={notification.content} />
                    </div>
                ))
            }
        </section>
    )
}