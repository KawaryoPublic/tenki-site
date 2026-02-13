"use client";

import { useEffect, useState } from "react";
import { Notification, Role } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import RoleDetailUI from "@/components/ui/role/RoleDetailUI";

export default function RoleDetailSection({ id, tier }: { id: number, tier: number }) {
    const [ role, setRole ] = useState<Role | null>(null);
    const [ notifications, setNotifications ] = useState<Notification | null>(null);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        fetch(`/api/role?id=${id}`)
            .then(res => res.json())
            .then(data => setRole(data))
            .then(() => {
                fetch(`/api/notification?role=${id}`)
                    .then(res => res.json())
                    .then(data => {
                        setNotifications(data);
                    })
                    .finally(() => setLoading(false))
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }, []);

    return (
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !role ? <div className="flex-1 flex flex-col items-center font-bold text-xl">役職を読み込めませんでした</div> :
        <section className="w-full flex flex-col gap-4">
            <RoleDetailUI role={role} notifications={notifications} tier={tier} />
            <div>
                <BlueButton href="/role">役職一覧に戻る</BlueButton>
            </div>
        </section>
    )
}