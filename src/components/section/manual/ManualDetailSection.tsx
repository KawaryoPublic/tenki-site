"use client";

import { useEffect, useState } from "react";
import { Manual, Role } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import ManualDetailUI from "@/components/ui/manual/ManualDetailUI";
import NotFoundSection from "../NotFoundSection";
import LoadingResultUI from "@/components/ui/global/LoadingResultUI";

export default function ManualDetailSection({ id, tier }: { id: number, tier: number }) {
    const [ roles, setRoles ] = useState<Role[]>([]);
    const [ manual, setManual ] = useState<Manual | null>();
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        setLoading(true);
        
        fetch(`/api/manual?id=${id}`)
            .then(res => res.json())
            .then(data => setManual(data))
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
        !manual || !roles ? <LoadingResultUI>マニュアルを読み込めませんでした</LoadingResultUI> :
        tier !== 3 && manual.tier !== tier ? <NotFoundSection /> :
        <section className="w-full flex flex-col gap-4">
            <ManualDetailUI manual={manual} roles={roles} tier={tier} />
            <div className="z-2">
                <BlueButton href="/manual">マニュアル一覧に戻る</BlueButton>
            </div>
        </section>
    )
}