"use client";

import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import LocationMapUI from "@/components/ui/storage/location/LocationMapUI";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Location } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import { checkTier } from "@/lib/utils";

export default function LocationSection({ id, tier }: { id: number, tier: number }) {
    const parentRef = useRef(null);
    const [ location, setLocation ] = useState<Location | null>(null);
    const [ locations, setLocations ] = useState<Location[]>([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch("/api/storage/location")
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
        <section className="flex-1 flex flex-col gap-4 items-center">
            <div className="flex items-center gap-4 md:gap-8">
                <WhiteFrameUI className="flex justify-center gap-4 md:gap-8">
                {
                    locations.map((location, i) => (
                        <div key={i}>
                            <Link href={`/storage/location/${location.id}`} className={`text-lg md:text-xl p-1 font-bold ${location.id === id ? "underline" : ""} hover:bg-gray-400`}>{location.name}</Link>
                        </div>
                    ))
                }
                </WhiteFrameUI>
                {
                    checkTier(tier) && <BlueButton href={`/storage/location/edit/${location.id}`}><span className="text-lg md:text-xl p-1 font-bold">編集</span></BlueButton>
                }
            </div>
            <div className="w-full flex-1 flex flex-col md:flex-row gap-4 lg:gap-8 relative" ref={parentRef}>
                <LocationMapUI location={location} parentRef={parentRef} />
            </div>
        </section>
    )
}