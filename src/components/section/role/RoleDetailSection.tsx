"use client";

import { useEffect, useState } from "react";
import { Notification, Role } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import RoleDetailUI from "@/components/ui/role/RoleDetailUI";
import NotificationUI from "@/components/ui/notification/NotificationUI";
import { defaultFilter } from "@/lib/utils";
import LoadingResultUI from "@/components/ui/global/LoadingResultUI";

export default function RoleDetailSection({ id, tier }: { id: number, tier: number }) {
    const [ role, setRole ] = useState<Role | null>(null);
    const [ roles, setRoles ] = useState<Role[]>([]);
    const [ notifications, setNotifications ] = useState<Notification[]>([]);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        setLoading(true);

        fetch("/api/role")
            .then(res => res.json())
            .then(data => {
                setRoles(data);

                setRole(data.find((r: Role) => r.id === id));
            })
            .then(() => {
                fetch("/api/notification")
                    .then(res => res.json())
                    .then(data => setNotifications(defaultFilter(data, [], undefined, 
                        [
                            {
                                label: "roles",
                                value: id
                            }
                        ]
                    ).slice(0, 5)))
                    .finally(() => setLoading(false))
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }, []);

    return (
        loading ? <LoadingResultUI>Loading...</LoadingResultUI> :
        !roles || !role || !notifications ? <LoadingResultUI>役職を読み込めませんでした</LoadingResultUI> :
        <section className="w-full flex flex-col gap-8">
            <RoleDetailUI role={role} tier={tier} />
            <div className="flex flex-col gap-4">
                <h2 className="text-xl md:text-3xl font-bold">{role.name}からの告知</h2>
                <div className="flex flex-col gap-4">
                {
                    notifications.length === 0 ? <LoadingResultUI>{role.name}からの告知はありません</LoadingResultUI> : 
                    notifications.map((notification, index) => (
                        <div key={index}>
                            <NotificationUI notification={notification} roles={roles} tier={tier} />
                        </div>
                    ))
                }
                </div>
            </div>
            <div className="z-2">
                <BlueButton href="/role">役職一覧に戻る</BlueButton>
            </div>
        </section>
    )
}