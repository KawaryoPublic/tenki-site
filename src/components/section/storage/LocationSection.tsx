"use client";

import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import LocationDetailUI from "@/components/ui/storage/LocationDetailUI";
import LocationMapUI from "@/components/ui/storage/LocationMapUI";
import { Equipment, TIER } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Location } from "@/lib/types";

export default function LocationSection({ id, tier }: { id: number, tier: TIER }) {
    const [ location, setLocation ] = useState<Location | null>(null);
    const [ locations, setLocations ] = useState<Location[]>([]);
    const [ allEquipment, setAllEquipment ] = useState<Equipment[]>([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        fetch("/api/location")
            .then(res => res.json())
            .then(data => {
                setLocations(data);

                const location = data.find((loc: Location) => loc.id === id);
                setLocation(location);

                if(location) {
                    fetch(`/api/equipment?location_id=${location.id}`)
                        .then(res => res.json())
                        .then(data => setAllEquipment(data))
                        .catch(err => console.error(err))
                }
            })
            .finally(() => setLoading(false))
            .catch(err => console.log(err));
    }, []);

    return (
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !location || !allEquipment ? <div className="flex-1 flex flex-col items-center font-bold text-xl">倉庫を読み込めませんでした</div> :
        <section className="flex-1 flex flex-col gap-4 items-center">
             <WhiteFrameUI className="flex flex gap-4">
                {
                    locations.map(([location, i]) => (
                        <div key={i}>
                            <Link href={`/storage/${location.id}`}>{location.name}</Link>
                        </div>
                    ))
                }
                </WhiteFrameUI>
            <div className="w-full flex-1 flex flex gap-2">
                <LocationMapUI location={location} />
                <LocationDetailUI location={location} allEquipment={allEquipment} tier={tier} />
            </div>
        </section>
    )
}