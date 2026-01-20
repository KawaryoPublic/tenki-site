"use client";

import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import LocationDetailUI from "@/components/ui/location/LocationDetailUI";
import LocationMapUI from "@/components/ui/location/LocationMapUI";
import { TIER } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Location } from "@/lib/types";

export default function LocationSection({ id, tier }: { id: number, tier: TIER }) {
    const [ location, setLocation ] = useState<Location | null>(null);
    const [ locations, setLocations ] = useState<Location[]>([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch("/api/location")
            .then(res => res.json())
            .then(data => {
                setLocations(data);

                const location = data.find((loc: Location) => loc.id === id);
                setLocation(location);
            })
            .finally(() => setLoading(false))
            .catch(err => console.log(err));
    }, []);

    return (
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !location ? <div className="flex-1 flex flex-col items-center font-bold text-xl">倉庫を読み込めませんでした</div> :
        <section className="flex-1 flex flex gap-4 items-center">
            <LocationMapUI location={location} />
            <div className="h-full flex-1 flex flex-col gap-2">
                <WhiteFrameUI className="flex justify-between items-center">
                    {
                        locations.map((location, i) => (
                            <div key={i}>
                                <Link href={`/storage/${location.id}`} className={`text-lg md:text-xl p-1 font-bold ${location.id === id ? "underline" : ""} hover:bg-gray-400`}>{location.name}</Link>
                            </div>
                        ))
                    }
                </WhiteFrameUI>
                <LocationDetailUI location={location} tier={tier} />
            </div>
        </section>
    )
}