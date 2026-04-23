"use client";

import { useEffect, useState } from "react";
import { Equipment, Role } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { checkTier, preventRefresh } from "@/lib/utils";
import EditEquipmentForm from "@/components/ui/equipment/Form/EditEquipmentForm";
import { Location } from "@/lib/types";
import LoadingResultUI from "@/components/ui/global/LoadingResultUI";

export default function EditEquipmentSection({ id, tier }: { id: number, tier: number }) {
    const [ roles, setRoles ] = useState<Role[]>([]);
    const [ equipment, setEquipment ] = useState<Equipment | null>();
    const [ locations, setLocations ] = useState<Location[]>([]);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        setLoading(true);

        fetch(`/api/equipment?id=${id}`)
            .then(res => res.json())
            .then(data => setEquipment(data))
            .then(() => {
                fetch("/api/storage/location")
                    .then(res => res.json())
                    .then(data => setLocations(data))
                    .then(() => {
                        fetch('/api/role')
                            .then(res => res.json())
                            .then(data => setRoles(data))
                            .finally(() => setLoading(false))
                            .catch(err => console.log(err));
                    })  
                    .catch(err => console.log(err));
            })
            .catch(err => console.error(err));

            return preventRefresh();
    }, []);

    return (
        checkTier(tier) &&
        loading ? <LoadingResultUI>Loading...</LoadingResultUI> :
        !equipment || !locations || !roles ? <LoadingResultUI>機材を読み込めませんでした</LoadingResultUI> :
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <EditEquipmentForm equipment={equipment} locations={locations} roles={roles} />
            </WhiteFrameUI>
            <div>
                <BlueButton>
                    <a href="/equipment">機材一覧に戻る</a>
                </BlueButton>
            </div>
        </section>
    )
}