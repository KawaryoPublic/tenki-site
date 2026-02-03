"use client";

import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import LocationMapUI from "@/components/ui/storage/location/LocationMapUI";
import { useEffect, useState, useRef } from "react";
import { Location } from "@/lib/types";
import EditLocationForm from "@/components/ui/storage/location/Form/EditLocationForm";
import BlueButton from "@/components/ui/global/Button/BlueButton";

export default function EditLocationSection({ id }: { id: number }) {
    const parentRef = useRef();
    const [ location, setLocation ] = useState<Location | null>(null);
    const [ displayMap, setDisplayMap ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch(`/api/storage/location?id=${id}`)
            .then(res => res.json())
            .then(data => setLocation(data))
            .finally(() => setLoading(false))
            .catch(err => console.log(err));
    }, []);

    return (
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !location ? <div className="flex-1 flex flex-col items-center font-bold text-xl">倉庫を読み込めませんでした</div> :
        <section className="relative flex-1 overflow-x-scroll" ref={parentRef}>
            <div className={displayMap ? "" : "hidden"}>
                <button className="fixed z-1 top-0 left-0 w-full h-screen bg-black opacity-50" onClick={() => setDisplayMap(false)}></button>
                <LocationMapUI location={location} parentRef={parentRef} />
            </div>
            <WhiteFrameUI>
                <EditLocationForm location={location} setLocation={setLocation} setDisplayMap={setDisplayMap} />
            </WhiteFrameUI>
            <div className="pt-4">
                <BlueButton href={`/storage/location/${location.id}`}>倉庫に戻る</BlueButton>
            </div>
        </section>
    )
}