"use client";

import { useEffect, useState } from "react";
import { Notification, Role } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import NotificationDetailUI from "@/components/ui/notification/NotificationDetailUI";

export default function NotificationDetailSection({ id, tier }: { id: number, tier: number }) {
    const [ roles, setRoles ] = useState<Role[]>([]);
    const [ notification, setNotification ] = useState<Notification | null>();
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        setLoading(true);
        
        fetch(`/api/notification?id=${id}`)
            .then(res => res.json())
            .then(data => setNotification(data))
            .then(() => {
                fetch('/api/role')
                  .then(res => res.json())
                  .then(data => setRoles(data))
                  .finally(() => setLoading(false))
                  .catch(err => console.error(err));
            })
            .catch(err => console.error(err))
    }, []);

    return (
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !notification || !roles ? <div className="flex-1 flex flex-col items-center font-bold text-xl">告知を読み込めませんでした</div> :
        <section className="w-full flex flex-col gap-4">
            <NotificationDetailUI notification={notification} roles={roles} tier={tier} />
            <div className="z-2">
                <BlueButton href="/notification">告知一覧に戻る</BlueButton>
            </div>
        </section>
    )
}