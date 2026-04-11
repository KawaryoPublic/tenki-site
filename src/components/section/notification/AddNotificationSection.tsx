"use client";

import BlueButton from "@/components/ui/global/Button/BlueButton";
import LoadingResultUI from "@/components/ui/global/LoadingResultUI";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import AddNotificationForm from "@/components/ui/notification/Form/AddNotificationForm";
import { Role } from "@/lib/types";
import { useState, useEffect } from 'react';

export default function AddNotificationSection() {
    const [ roles, setRoles ] = useState<Role[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);

        fetch('/api/role')
        .then(res => res.json())
        .then(data => setRoles(data))
        .finally(() => setLoading(false))
        .catch(err => console.log(err));
    }, []);

    return (
        loading ? <LoadingResultUI>Loading...</LoadingResultUI> :
        !roles ? <LoadingResultUI>告知を読み込めませんでした</LoadingResultUI> :
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <AddNotificationForm roles={roles} />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/notification">告知一覧に戻る</BlueButton>
            </div>
        </section>
    )
}