"use client";

import AddEquipmentForm from "@/components/ui/equipment/Form/AddEquipmentForm";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { useEffect, useState } from "react";
import { Location } from "@/lib/types";

export default function AddEquipmentSection() {
    const [ locations, setLocations ] = useState<Location[]>([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch("/api/location")
            .then(res => res.json())
            .then(data => setLocations(data))
            .finally(() => setLoading(false))
            .catch(err => console.log(err));
    }, []);
    return (
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <AddEquipmentForm locations={locations}/>
            </WhiteFrameUI>
            <div>
                <BlueButton href="/equipment">機材一覧に戻る</BlueButton>
            </div>
        </section>
    )
}