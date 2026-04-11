"use client";

import AddEquipmentForm from "@/components/ui/equipment/Form/AddEquipmentForm";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { useEffect, useState } from "react";
import { Location, Role } from "@/lib/types";
import LoadingResultUI from "@/components/ui/global/LoadingResultUI";

export default function AddEquipmentSection() {
    const [ roles, setRoles ] = useState<Role[]>([]);
    const [ locations, setLocations ] = useState<Location[]>([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setLoading(true);

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
    }, []);
    return (
        loading ? <LoadingResultUI>Loading...</LoadingResultUI> :
        !locations || !roles ? <LoadingResultUI>機材を読み込めませんでした</LoadingResultUI> :
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <AddEquipmentForm locations={locations} roles={roles} />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/equipment">機材一覧に戻る</BlueButton>
            </div>
        </section>
    )
}