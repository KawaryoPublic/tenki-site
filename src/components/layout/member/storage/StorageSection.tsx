"use client";

import { Box } from "@/lib/type";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BoxElement from "@/components/ui/member/storage/BoxElement";
import BoxDetail from "@/components/ui/member/storage/BoxDetail";
import RestrictedLink from "@/components/ui/global/RestrictedLink";

export default function StorageSection() {
    const box = useSearchParams().get("box");
    const floor = useSearchParams().get("floor");
    const [updateBox, setUpdateBox] = useState<Box>({id: -1, name: "", number: "", annotation: "", link: "", width: 0, height: 0, top: 0, left: 0});
    const [boxes, setBoxes] = useState<Box[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/box")
            .then(res => res.json())
            .then(data => {
                setBoxes(data);

                if(!box) {
                    setLoading(false);
                    return;
                }

                const temp = data.find((b: Box) => b.id === Number(box));

                if (temp) setUpdateBox(temp);

                setLoading(false);
            })
            .catch(err => console.log(err));
    }, [box]);

    return (
        loading ? <div>Loading...</div> :
        <section className="flex flex-col md:flex-row justify-center gap-4 md:max-h-full">
            <div className="flex-1 flex flex-row justify-center gap-4">
                <div className="flex flex-col justify-center">
                    <div>
                        <RestrictedLink href="/storage" otherParams="floor=0" className="font-bold">地</RestrictedLink>
                    </div>
                    <div>
                        <RestrictedLink href="/storage" otherParams="floor=1" className="font-bold">1</RestrictedLink>
                    </div>
                    <div>
                        <RestrictedLink href="/storage" otherParams="floor=2" className="font-bold">2</RestrictedLink>
                    </div>
                    <div>
                        <RestrictedLink href="/storage" otherParams="floor=3" className="font-bold">3</RestrictedLink>
                    </div>
                </div>
                <div className="border aspect-[1/2] relative flex-1">
                    {
                        box ? 
                        <BoxElement box={updateBox} /> : ""
                    }
                    {
                        boxes.map((box, index) => {
                            return box.id === updateBox.id ? "" : <BoxElement key={index} box={box} />
                        })
                    }
                </div>
            </div>
            {
                box ?
                <div className="flex-1">
                    <BoxDetail updateBox={updateBox} setUpdateBox={setUpdateBox} />
                </div> : ""
            }
        </section>
    )
}
