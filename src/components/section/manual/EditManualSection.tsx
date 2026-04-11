"use client";

import { useEffect, useState } from "react";
import { Manual, Role } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { checkTier } from "@/lib/utils";
import EditManualForm from "@/components/ui/manual/Form/EditManualForm";
import LoadingResultUI from "@/components/ui/global/LoadingResultUI";

export default function EditManualSection({ id, tier }: { id: number, tier: number }) {
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
                    .catch(err => console.log(err));
            })
            .catch(err => console.error(err))
    }, []);

    return (
        checkTier(tier) &&
        loading ? <LoadingResultUI>Loading...</LoadingResultUI> :
        !manual || !roles ? <LoadingResultUI>マニュアルを読み込めませんでした</LoadingResultUI> :
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <EditManualForm manual={manual} roles={roles} />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/manual">マニュアル一覧に戻る</BlueButton>
            </div>
        </section>
    )
}