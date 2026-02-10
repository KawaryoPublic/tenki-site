"use client";

import { useEffect, useState, useRef } from "react";
import { Location, Shelf } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import EditLocationMapUI from "@/components/ui/storage/location/EditLocationMapUI";

export default function LocationSection({ id }: { id: number }) {
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
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !location ? <div className="flex-1 flex flex-col items-center font-bold text-xl">倉庫を読み込めませんでした</div> :
        <section className="flex-1 flex flex-col gap-4 items-center">
            <div className="z-2 flex items-center gap-4 md:gap-8">
                <BlueButton href={`/storage/location/edit/${location.id}`}><span className="text-lg md:text-xl p-1 font-bold">追加</span></BlueButton>
                <BlueButton onClick={() => alert()}><span className="text-lg md:text-xl p-1 font-bold">保存</span></BlueButton>
            </div>
            <div className="w-full flex-1 flex flex-col md:flex-row justify-center items-center relative" ref={parentRef}>
                <EditLocationMapUI location={location} shelves={shelves} setShelves={setShelves} parentRef={parentRef} />
            </div>
        </section>
    )
}