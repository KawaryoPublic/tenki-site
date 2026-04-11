"use client";

import { useEffect, useState } from "react";
import { Role } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import EditRoleForm from "@/components/ui/role/Form/EditRoleForm";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import LoadingResultUI from "@/components/ui/global/LoadingResultUI";

export default function EditRoleSection({ id }: { id: number }) {
    const [ role, setRole ] = useState<Role | null>(null);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        setLoading(true);
        
        fetch(`/api/role?id=${id}`)
            .then(res => res.json())
            .then(data => setRole(data))
            .finally(() => setLoading(false))
            .catch(err => console.error(err));
    }, []);

    return (
        loading ? <LoadingResultUI>Loading...</LoadingResultUI> :
        !role ? <LoadingResultUI>役職を読み込めませんでした</LoadingResultUI> :
        <section className="w-full flex flex-col gap-8">
            <WhiteFrameUI>
                <EditRoleForm role={role} />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/role">役職一覧に戻る</BlueButton>
            </div>
        </section>
    )
}