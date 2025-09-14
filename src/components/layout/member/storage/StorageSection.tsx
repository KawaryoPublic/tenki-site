"use client";

import { Box } from "@/lib/type";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BoxElement from "@/components/ui/member/storage/BoxElement";
import BoxDetail from "@/components/ui/member/storage/BoxDetail";
import RestrictedLink from "@/components/ui/global/RestrictedLink";
import AddBoxButton from "@/components/ui/member/storage/AddBoxButton";

export default function StorageSection() {
    const searchParams = useSearchParams();
    const box = searchParams.get("box");
    const floor = searchParams.get("floor");
    const q = searchParams.get("q") ?? "";
    const [updateBox, setUpdateBox] = useState<Box>({id: -1, name: "", number: "", annotation: "", link: "", floor: 0, width: 0, height: 0, top: 0, left: 0});
    const [boxes, setBoxes] = useState<Box[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch("/api/box")
            .then(res => res.json())
            .then(data => {
                setBoxes(data.map((b: Box) => b.floor === Number(floor) ? b : []));

                if(!box) {
                    setUpdateBox({id: -1, name: "", number: "", annotation: "", link: "", floor: 0, width: 0, height: 0, top: 0, left: 0})
                    setLoading(false);
                    return;
                }

                const temp = data.find((b: Box) => b.id === Number(box));

                if (temp) setUpdateBox(temp);

                setLoading(false);
            })
            .catch(err => console.log(err));
    }, [searchParams]);

    return (
        loading ? <div>Loading...</div> :
        <section className="flex flex-col lg:flex-row lg:justify-center gap-4 h-full">
            <div className="flex flex-row justify-center gap-2 lg:gap-4 h-full min-h-full">
                <div className="flex flex-col justify-center">
                    <div>
                        <RestrictedLink href="/storage" otherParams="floor=3" className="font-bold">3</RestrictedLink>
                    </div>
                    <div>
                        <RestrictedLink href="/storage" otherParams="floor=2" className="font-bold">2</RestrictedLink>
                    </div>
                    <div>
                        <RestrictedLink href="/storage" otherParams="floor=1" className="font-bold">1</RestrictedLink>
                    </div>
                    <div>
                        <RestrictedLink href="/storage" otherParams="floor=0" className="font-bold">0</RestrictedLink>
                    </div>
                </div>
                <div className="border aspect-[1/2] relative">
                    {
                        box ? 
                        <BoxElement floor={Number(floor)} box={updateBox} /> : ""
                    }
                    {
                        boxes.map((box, index) => {
                            return box.id === updateBox.id ? "" : <BoxElement key={index} floor={Number(floor)} box={box} />
                        })
                    }
                </div>
            </div>
            {
                box ?
                <div className="lg:min-w-[40%] lg:w-[40%]">
                    <BoxDetail updateBox={updateBox} setUpdateBox={setUpdateBox} q={q} />
                </div> : 
                <div className="flex justify-center items-center">
                    <span><AddBoxButton floor={Number(floor)} /></span>
                </div>
            }
        </section>
    )
}
