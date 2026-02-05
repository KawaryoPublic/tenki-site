"use client";

import BlueButton from "@/components/ui/global/Button/BlueButton";
import ShelfMapUI from "@/components/ui/storage/shelf/ShelfMapUI";
import Link from "next/link";
import { Shelf } from "@/lib/types";
import { checkTier } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";

export default function ShelfSection({ id, tier }: { id: number, tier: number }) {
        const parentRef = useRef(null);
    const [ shelf, setShelf ] = useState<Shelf | null>(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch(`/api/storage/shelf?id=${id}`)
            .then(res => res.json())
            .then(data => setShelf(data))
            .finally(() => setLoading(false))
            .catch(err => console.log(err));
    }, []);

    return (
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !shelf ? <div className="flex-1 flex flex-col items-center font-bold text-xl">場所を読み込めませんでした</div> :
        <section className="flex-1 flex flex-col gap-4 items-center">
            <div>
                <WhiteFrameUI className="flex items-center gap-4 md:gap-8 text-lg md:text-xl font-bold">
                    {shelf.name}
                    {
                        checkTier(tier) && <BlueButton href={`/storage/shelf/edit/${shelf.id}`}>編集</BlueButton>
                    }
                </WhiteFrameUI>
            </div>
            <div className="w-full flex-1 flex flex-col md:flex-row gap-4 lg:gap-8 justify-center items-center relative" ref={parentRef}>
                <ShelfMapUI shelf={shelf} parentRef={parentRef} />
            </div>
            <div className="w-full">
                <BlueButton href={`/storage/location/${shelf.location.id}`}>{shelf.location.name}に戻る</BlueButton>
            </div>
        </section>
    )
}