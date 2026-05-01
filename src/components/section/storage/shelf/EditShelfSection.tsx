"use client";

import { useEffect, useState, useRef } from "react";
import { Equipment, EquipmentInstance, Shelf } from "@/lib/types";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import LoadingResultUI from "@/components/ui/global/LoadingResultUI";
import { fitToParentSize, preventRefresh } from "@/lib/utils";
import EditShelfMapUI from "@/components/ui/storage/shelf/EditShelfMapUI";

export default function EditShelfSection({ id, height }: { id: number, height: number }) {
    const parentRef = useRef(null);
    const [ shelf, setShelf ] = useState<Shelf | null>(null);
    const [ equipment, setEquipment ] = useState<Equipment[]>([]);
    const [ shelfEquipment, setShelfEquipment ] = useState<{equipment: EquipmentInstance, state: "none" | "added" | "updated" | "deleted"}[]>([]);
    const [ loading, setLoading ] = useState(true);
    const [ size, setSize ] = useState<number[]>([]);
    const [ add, setAdd ] = useState<boolean>(false);
    

    useEffect(() => {
        setLoading(true);

        fetch(`/api/storage/shelf?id=${id}`)
            .then(res => res.json())
            .then(data => {
                setShelf(data);
                setShelfEquipment(data.equipment.map((equipment: EquipmentInstance) => ({ equipment, state: "none" })));

                return data;
            })
            .then(shelf => {
                fetch(`/api/equipment`)
                    .then(res => res.json())
                    .then(data => setEquipment(data.filter((equipment: Equipment) => equipment.location.id === shelf?.location.id)))
                    .finally(() => setLoading(false));
            })
            .catch(err => console.log(err));

        return preventRefresh();
    }, []);

    useEffect(() => {
        if(shelf) {
            setSize(fitToParentSize(parentRef, shelf.size[0] / shelf.size[1]));
        }
    }, [loading]);

    return (
        loading ? <LoadingResultUI>Loading...</LoadingResultUI> :
        !shelf ? <LoadingResultUI>棚を読み込めませんでした</LoadingResultUI> :
        <section className="flex-1 flex flex-col gap-4 items-center">
            <div className="flex items-center gap-4 md:gap-8 z-1">
                <BlueButton onClick={() => setAdd(true)}>
                    <span className="text-lg md:text-xl p-1 font-bold">追加</span>
                </BlueButton>
                save
            </div>
            <div className="w-full flex-1 flex flex-col gap-4 md:gap-8 items-center" ref={parentRef}>
                <div className="flex justify-center">
                    <EditShelfMapUI shelf={shelf} shelfEquipment={shelfEquipment} setShelfEquipment={setShelfEquipment} size={size} height={height} add={add} setAdd={setAdd} equipment={equipment} />
                </div>
                <div className="w-full md:w-[80%] lg:w-[60%] z-1">
                    <BlueButton>
                        <a href={`/storage/shelf/${shelf.id}`}>
                            <span className="text-lg md:text-xl p-1 font-bold">{shelf.name}にもどる</span>
                        </a>
                    </BlueButton>
                </div>
            </div>
            
        </section>
    )
}