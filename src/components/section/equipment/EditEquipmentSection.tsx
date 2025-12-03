"use client";

import { useEffect, useState } from "react";
import { Equipment, TIER } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { checkTier } from "@/lib/utils";
import EditEquipmentForm from "@/components/ui/equipment/Form/EditEquipmentForm";

export default function EditEquipmentSection({ id, tier }: { id: number, tier: TIER }) {
    const [ equipment, setEquipment ] = useState<Equipment | null>();
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        fetch(`/api/equipment?id=${id}`)
            .then(res => res.json())
            .then(data => setEquipment(data))
            .finally(() => setLoading(false))
            .catch(err => console.error(err))
    }, []);

    return (
        checkTier(tier) &&
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !equipment ? <div className="flex-1 flex flex-col items-center font-bold text-xl">機材を読み込めませんでした</div> :
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <EditEquipmentForm equipment={equipment} />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/equipment">機材一覧に戻る</BlueButton>
            </div>
        </section>
    )
}