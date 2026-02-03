"use client";

import ShelfDetailUI from "@/components/ui/storage/shelf/LocationDetailUI";
import ShelfMapUI from "@/components/ui/storage/shelf/ShelfMapUI";
import { Shelf } from "@/lib/types";
import { useEffect, useState } from "react";

export default function ShelfSection({ id, tier }: { id: number, tier: number }) {
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
            <div className="w-full flex-1 flex flex-col md:flex-row gap-4 lg:gap-8">
                <ShelfMapUI shelf={shelf} />
                <ShelfDetailUI shelf={shelf} tier={tier} />
            </div>
        </section>
    )
}