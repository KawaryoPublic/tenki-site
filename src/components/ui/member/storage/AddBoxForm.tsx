"use client";

import { Box } from "@/lib/type";
import Form from "next/form";
import { Dispatch, SetStateAction } from "react";
import DefaultTextArea from "../../global/form/DefaultTextArea";
import BlueButton from "../../global/button/BlueButton";

export default function AddBoxForm({ newBox, setNewBox }: { newBox: Box, setNewBox: Dispatch<SetStateAction<Box>>}) {
    return (
        <Form
            action={async formData => {
                await fetch("/api/box", {
                    method: "POST",
                    body: JSON.stringify({
                        name: formData.get("name"),
                        width: Number(formData.get("width")),
                        height: Number(formData.get("height")),
                        top: Number(formData.get("top")),
                        left: Number(formData.get("left"))
                    })
                }).then(() => window.location.reload())
                .catch(err => console.log(err));
            }}
            className="w-full h-full flex flex-col justify-center gap-2"
        >
            <DefaultTextArea
                title="名前"
                name="name"
                rows={1}
                value={newBox.name}
                onChange={e => setNewBox({...newBox, name: e.target.value})}
            />
            <div className="flex justify-center gap-2">
                <label htmlFor="width" className="font-bold">横幅</label>
                <input 
                    type="range" 
                    name="width" 
                    min={0} 
                    max={100 - newBox.left} 
                    value={newBox.width} 
                    onChange={e => setNewBox({...newBox, width: Number(e.target.value)})}
                    className="flex-1"
                />  
            </div>
            <div className="flex justify-center gap-2">
                <label htmlFor="height" className="font-bold">縦幅</label>
                <input 
                    type="range" 
                    name="height" 
                    min={0} 
                    max={100 - newBox.top} 
                    value={newBox.height} 
                    onChange={e => setNewBox({...newBox, height: Number(e.target.value)})}
                    className="flex-1"
                />  
            </div>
            <div className="flex justify-center gap-2">
                <label htmlFor="left" className="font-bold">x</label>
                <input 
                    type="range" 
                    name="left" 
                    min={0} 
                    max={100 - newBox.width} 
                    value={newBox.left} 
                    onChange={e => setNewBox({...newBox, left: Number(e.target.value)})}
                    className="flex-1"
                />  
            </div>
            <div className="flex justify-center gap-2">
                <label htmlFor="top" className="font-bold">y</label>
                <input 
                    type="range" 
                    name="top" 
                    min={0} 
                    max={100 - newBox.height} 
                    value={newBox.top} 
                    onChange={e => setNewBox({...newBox, top: Number(e.target.value)})}
                    className="flex-1"
                />  
            </div>
            <BlueButton>追加</BlueButton>
        </Form>
    )
}