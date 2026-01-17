"use client";

import { useEffect, useState } from "react";
import { Equipment, TIER } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import EquipmentDetailUI from "@/components/ui/equipment/EquipmentDetailUI";
import { Location } from "@/lib/types";

export default function EquipmentDetailSection({ id, tier }: { id: number, tier: TIER }) {
    const [ equipment, setEquipment ] = useState<Equipment | null>();
    const [ location, setLocation ] = useState<Location | null>(null);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        setLoading(true);

        fetch(`/api/equipment?id=${id}`)
            .then(res => res.json())
            .then(data => {
                setEquipment(data);

                fetch(`/api/location?id=${data.locationId}`)
                    .then(res => res.json())
                    .then(data => setLocation(data))
                    .finally(() => setLoading(false))
                    .catch(err => console.log(err));
            })
            .catch(err => console.error(err))
    }, []);

    return (
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !equipment || !location ? <div className="flex-1 flex flex-col items-center font-bold text-xl">機材を読み込めませんでした</div> :
        <section className="w-full flex flex-col gap-4">
            <EquipmentDetailUI equipment={equipment} location={location} tier={tier} />
            <div>
                <BlueButton href="/equipment">機材一覧に戻る</BlueButton>
            </div>
        </section>
    )
}