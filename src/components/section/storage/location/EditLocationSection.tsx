"use client";

import { useEffect, useState, useRef } from "react";
import { Location, Shelf } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import EditLocationMapUI from "@/components/ui/storage/location/EditLocationMapUI";

export default function LocationSection({ id, add }: { id: number, add: boolean }) {
    const parentRef = useRef(null);
    const [ location, setLocation ] = useState<Location | null>(null);
    const [ shelves, setShelves ] = useState<Shelf[]>([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch(`/api/storage/location?id=${id}`)
            .then(res => res.json())
            .then(data => {
                setLocation(data);
                setShelves(data.shelves);
            })
            .finally(() => setLoading(false))
            .catch(err => console.log(err));
    }, []);

    return (
        loading ? <LoadingResultUI>Loading...</LoadingResultUI> :
        !location ? <LoadingResultUI>倉庫を読み込めませんでした</LoadingResultUI> :
        <section className="flex-1 flex flex-col gap-4 items-center">
            <div className="flex items-center gap-4 md:gap-8">
                <BlueButton href={`/storage/location/edit/${location.id}?add=on`} className="z-1"><span className="text-lg md:text-xl p-1 font-bold">追加</span></BlueButton>
                
            </div>
            <div className="w-full flex-1 flex flex-col md:flex-row justify-center items-center relative" ref={parentRef}>
                <EditLocationMapUI location={location} shelves={shelves} setShelves={setShelves} parentRef={parentRef} add={add} />
            </div>
        </section>
    )
}