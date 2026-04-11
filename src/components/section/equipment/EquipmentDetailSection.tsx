"use client";

import { useEffect, useState } from "react";
import { Equipment, Role } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import EquipmentDetailUI from "@/components/ui/equipment/EquipmentDetailUI";
import LoadingResultUI from "@/components/ui/global/LoadingResultUI";

export default function EquipmentDetailSection({ id, tier }: { id: number, tier: number }) {
    const [ roles, setRoles ] = useState<Role[]>([]);
    const [ equipment, setEquipment ] = useState<Equipment | null>(null);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        setLoading(true);

        fetch(`/api/equipment?id=${id}`)
            .then(res => res.json())
            .then(data => setEquipment(data))
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
        !equipment || !roles ? <LoadingResultUI>機材を読み込めませんでした</LoadingResultUI> :
        <section className="w-full flex flex-col gap-4">
            <EquipmentDetailUI equipment={equipment} roles={roles} tier={tier} />
            <div className="z-2">
                <BlueButton href="/equipment">機材一覧に戻る</BlueButton>
            </div>
        </section>
    )
}