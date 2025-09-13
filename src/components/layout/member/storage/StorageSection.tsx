"use client";

import { Box } from "@/lib/type";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BoxElement from "@/components/ui/member/storage/BoxElement";
import BoxDetail from "@/components/ui/member/storage/BoxDetail";

export default function StorageSection() {
    const box = useSearchParams().get("box");
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
                console.log(data);

                if (temp) setUpdateBox(temp);

                setLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        loading ? <div>Loading...</div> :
        <section className="flex flex-col lg:flex-row justify-center gap-4 h-full">
            <div className="flex-1 flex flex-row justify-center gap-4">
                <div className="flex flex-col justify-center">
                    <p className="font-bold">1</p>
                    <p className="font-bold">2</p>
                    <p className="font-bold">3</p>
                </div>
                <div className="border aspect-[1/2] relative">
                    {
                        box ? 
                        <BoxElement box={updateBox} /> : ""
                    }
                    {
                        boxes.map((box, index) => {
                            return box === updateBox ? "" : <BoxElement key={index} box={box} />
                        })
                    }
                </div>
            </div>
            <div className="lg:flex-1">
                <BoxDetail updateBox={updateBox} setUpdateBox={setUpdateBox} />
            </div>
            {`${updateBox.id} ${box} ${boxes}`}
        </section>
    )
}
