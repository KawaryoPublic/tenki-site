"use client";

import BlueButton from "@/components/ui/global/Button/BlueButton";
import ShelfMapUI from "@/components/ui/storage/shelf/ShelfMapUI";
import { Shelf } from "@/lib/types";
import { checkTier, fitToParentSize, preventRefresh } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import LoadingResultUI from "@/components/ui/global/LoadingResultUI";

export default function ShelfSection({ id, tier, height }: { id: number, tier: number, height: number }) {
    const parentRef = useRef(null);
    const [ shelf, setShelf ] = useState<Shelf | null>(null);
    const [ loading, setLoading ] = useState(true);
    const [ size, setSize ] = useState<number[]>([]);

    useEffect(() => {
        setLoading(true);

        fetch(`/api/storage/shelf?id=${id}`)
            .then(res => res.json())
            .then(data => setShelf(data))
            .finally(() => setLoading(false))
            .catch(err => console.log(err));

        return preventRefresh();
    }, []);

    useEffect(() => {
        if (shelf) {
            setSize(fitToParentSize(parentRef, shelf.size[0] / shelf.size[1]));
        }
    }, [loading]);

    return (
        loading ? <LoadingResultUI>Loading...</LoadingResultUI> :
        !shelf ? <LoadingResultUI>棚を読み込めませんでした</LoadingResultUI> :
        <section className="flex-1 flex flex-col gap-4 md:gap-8 items-center">
            <div className="flex items-center gap-4 md:gap-8">
                <WhiteFrameUI className="flex items-center gap-4 md:gap-8 text-lg md:text-xl font-bold">
                    <span className="text-lg md:text-xl m-1">{shelf.name}</span>
                </WhiteFrameUI>
                {
                    checkTier(tier) && <BlueButton href={`/storage/shelf/edit/${shelf.id}?height=${height}`}><span className="text-lg md:text-xl p-1 font-bold">編集</span></BlueButton>
                }
            </div>
            <div className="w-full flex-1 flex flex-col gap-4 lg:gap-8 items-center" ref={parentRef}>
                <div className="flex justify-center">
                    <ShelfMapUI shelf={shelf} size={size} />
                </div>
                <div className="w-full z-1">
                    <BlueButton>
                        <a href={`/storage/location/${shelf.location.id}`}>
                            <span className="text-lg md:text-xl p-1 font-bold">{shelf.location.name}にもどる</span>
                        </a>
                    </BlueButton>
                </div>
            </div>
        </section>
    )
}