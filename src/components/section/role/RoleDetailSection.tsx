"use client";

import { useEffect, useState } from "react";
import { Notification, Role } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import RoleDetailUI from "@/components/ui/role/RoleDetailUI";
import NotificationUI from "@/components/ui/notification/NotificationUI";

export default function RoleDetailSection({ id, tier }: { id: number, tier: number }) {
    const [ role, setRole ] = useState<Role | null>(null);
    const [ notifications, setNotifications ] = useState<Notification[]>([]);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        fetch(`/api/role?id=${id}`)
            .then(res => res.json())
            .then(data => setRole(data))
            .then(() => {
                fetch(`/api/notification?role=${id}`)
                    .then(res => res.json())
                    .then(data => setNotifications(data))
                    .finally(() => setLoading(false))
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }, []);

    return (
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !role ? <div className="flex-1 flex flex-col items-center font-bold text-xl">役職を読み込めませんでした</div> :
        <section className="w-full flex flex-col gap-8">
            <RoleDetailUI role={role} tier={tier} />
            <div className="flex flex-col gap-4">
                <h2 className="text-xl md:text-3xl font-bold">告知</h2>
                <div className="flex flex-col gap-4">
                {
                    notifications.map((notification, index) => (
                        <div key={index}>
                            <NotificationUI notification={notification} tier={tier} />
                        </div>
                    ))
                }
                </div>
            </div>
            
            <div>
                <BlueButton href="/role">役職一覧に戻る</BlueButton>
            </div>
        </section>
    )
}