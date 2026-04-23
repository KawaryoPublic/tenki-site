"use client";

import { useEffect, useState, useRef } from "react";
import { Location, Shelf } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import EditLocationMapUI from "@/components/ui/storage/location/EditLocationMapUI";
import LoadingResultUI from "@/components/ui/global/LoadingResultUI";
import SaveLocationButton from "@/components/ui/storage/location/Button/SaveLocationButton";

export default function LocationSection({ id }: { id: number }) {
    const parentRef = useRef(null);
    const [ location, setLocation ] = useState<Location | null>(null);
    const [ shelves, setShelves ] = useState<{shelf: Shelf, state: "none" | "added" | "updated" | "deleted"}[]>([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch(`/api/storage/location?id=${id}`)
            .then(res => res.json())
            .then(data => {
                setLocation(data);
                setShelves(data.shelves.map((shelf: Shelf) => ({ shelf, state: "none" })));
            })
            .finally(() => setLoading(false))
            .catch(err => console.log(err));
    }, []);

    return (
        loading ? <LoadingResultUI>Loading...</LoadingResultUI> :
        !location ? <LoadingResultUI>倉庫を読み込めませんでした</LoadingResultUI> :
        <section className="flex-1 flex flex-col gap-4 items-center">
            <div className="flex items-center gap-4 md:gap-8 z-1">
                <BlueButton onClick={() => {
                    const shelf = {
                        id: shelves.length + 1,
                        name: "名無し",
                        location: undefined as unknown as Location,
                        type: 0,
                        size: [50, 50],
                        position: [0, 0],
                        equipment: [],
                        updatedAt: new Date(),
                    };

                    setShelves(prev => [...prev, { shelf, state: "added" }]);
                }}>
                    <span className="text-lg md:text-xl p-1 font-bold">追加</span>
                </BlueButton>
                <SaveLocationButton id={location.id} shelves={shelves} />
            </div>
            <div className="w-full flex-1 flex flex-col md:flex-row justify-center items-center relative" ref={parentRef}>
                <EditLocationMapUI location={location} shelves={shelves} setShelves={setShelves} parentRef={parentRef} />
            </div>
            <div className="z-1">
                <BlueButton>
                    <a href={`/storage/location/${location.id}`}>
                        <span className="text-lg md:text-xl p-1 font-bold">{location.name}にもどる</span>
                    </a>
                </BlueButton>
            </div>
        </section>
    )
}