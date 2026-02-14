"use client";

import { useEffect, useState } from "react";
import { Notification, Role } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import EditNotificationForm from "@/components/ui/notification/Form/EditNotificationForm";
import { checkTier } from "@/lib/utils";

export default function EditNotificationSection({ id, tier }: { id: number, tier: number }) {
    const [ notification, setNotification ] = useState<Notification | null>();
    const [ roles, setRoles ] = useState<Role[]>([]);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        fetch(`/api/notification?id=${id}`)
            .then(res => res.json())
            .then(data => setNotification(data))
            .then(() => {
                fetch('/api/role')
                    .then(res => res.json())
                    .then(data => setRoles(data))
                    .finally(() => setLoading(false))
                    .catch(err => console.log(err));
            })
            .catch(err => console.error(err))
    }, []);

    return (
        checkTier(tier) &&
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !notification ? <div className="flex-1 flex flex-col items-center font-bold text-xl">告知を読み込めませんでした</div> :
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <EditNotificationForm notification={notification} roles={roles} />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/notification">告知一覧に戻る</BlueButton>
            </div>
        </section>
    )
}