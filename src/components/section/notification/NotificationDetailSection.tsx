"use client";

import { useEffect, useState } from "react";
import { Notification, Role } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import NotificationDetailUI from "@/components/ui/notification/NotificationDetailUI";
import NotFoundSection from "../NotFoundSection";
import LoadingResultUI from "@/components/ui/global/LoadingResultUI";

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
        loading ? <LoadingResultUI>Loading...</LoadingResultUI> :
        !notification || !roles ? <LoadingResultUI>告知を読み込めませんでした</LoadingResultUI> :
        tier !== 3 && notification.tier !== tier ? <NotFoundSection /> :
        <section className="w-full flex flex-col gap-4">
            <NotificationDetailUI notification={notification} roles={roles} tier={tier} />
            <div className="z-2">
                <BlueButton href="/notification">告知一覧に戻る</BlueButton>
            </div>
        </section>
    )
}