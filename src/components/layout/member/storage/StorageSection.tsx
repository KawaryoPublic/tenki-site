"use client";

import DefaultTextArea from "@/components/ui/global/form/DefaultTextArea";
import AddBoxForm from "@/components/ui/member/storage/AddBoxForm";
import { Box } from "@/lib/type";
import { useEffect, useState } from "react";

export default function StorageSection() {7
    const [newBox, setNewBox] = useState<Box>({
        id: -1, 
        name: "", 
        top: 0,
        left: 0,
        width: 20,
        height: 20
    });

    const [boxes, setBoxes] = useState<Box[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/box")
            .then(res => res.json())
            .then(data => setBoxes(data))
            .then(() => setLoading(true))
            .catch(err => console.log(err));
    }, []);

    return (
        <section className="flex flex-col lg:flex-row justify-center gap-4 h-full">
            <div className="flex-1 flex flex-row justify-center gap-4">
                <div className="flex flex-col justify-center">
                    <p className="font-bold">1</p>
                    <p className="font-bold">2</p>
                    <p className="font-bold">3</p>
                </div>
                <div className="border aspect-[1/2]">
                    <div
                        className="border relative text-sm"
                        style={{
                            width: `${newBox.width}%`,
                            height: `${newBox.height}%`,
                        }}
                    >
                        <div
                            className="absolute w-full h-full flex justify-center items-center"
                            style={{
                                top: `${newBox.top}%`,
                                left: `${newBox.left}%`
                            }}
                        >
                            {newBox.name}
                        </div>
                    </div>
                    {
                        boxes.map((box, index) => {
                            return (
                                <div
                                    className="border relative text-sm"
                                    style={{
                                        width: `${box.width}%`,
                                        height: `${box.height}%`
                                    }}
                                >
                                    <div
                                        key={index}
                                        className="absolute w-full h-full flex justify-center items-center"
                                        style={{
                                            top: `${box.top}%`,
                                            left: `${box.left}%`
                                        }}
                                    >
                                        {box.name}
                                    </div>
                                </div>
                            );
                        })
                    }
                    
                </div>
            </div>
            <div className="lg:flex-1">
                <AddBoxForm newBox={newBox} setNewBox={setNewBox} />
            </div>
        </section>
    )
}
