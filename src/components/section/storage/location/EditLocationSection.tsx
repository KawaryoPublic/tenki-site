"use client";

import { useEffect, useState, useRef } from "react";
import { Location, Shelf } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import EditLocationMapUI from "@/components/ui/storage/location/EditLocationMapUI";
import LoadingResultUI from "@/components/ui/global/LoadingResultUI";
import SaveLocationButton from "@/components/ui/storage/location/Button/SaveLocationButton";
import { fitToParentSize, preventRefresh } from "@/lib/utils";

export default function EditLocationSection({ id }: { id: number }) {
    const parentRef = useRef(null);
    const [ location, setLocation ] = useState<Location | null>(null);
    const [ shelves, setShelves ] = useState<{shelf: Shelf, state: "none" | "added" | "updated" | "deleted"}[]>([]);
    const [ loading, setLoading ] = useState(true);
    const [ size, setSize ] = useState<number[]>([]);

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

        return preventRefresh();
    }, []);

    useEffect(() => {
        if(location) {
            setSize(fitToParentSize(parentRef, location.size[0] / location.size[1]));
        }
    }, [loading]);

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
                <SaveLocationButton location={location} shelves={shelves} />
            </div>
            <div className="w-full flex-1 flex flex-col gap-4 md:gap-8 items-center" ref={parentRef}>
                <div className="flex justify-center">
                    <EditLocationMapUI location={location} shelves={shelves} setShelves={setShelves} size={size} />
                </div>
                <div className="w-full md:w-[80%] lg:w-[60%] z-1">
                    <BlueButton>
                        <a href={`/storage/location/${location.id}`}>
                            <span className="text-lg md:text-xl p-1 font-bold">{location.name}にもどる</span>
                        </a>
                    </BlueButton>
                </div>
            </div>
            
        </section>
    )
}