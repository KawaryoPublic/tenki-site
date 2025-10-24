"use client";

import { Box } from "@/lib/type";
import Form from "next/form";
import { Dispatch, SetStateAction } from "react";
import DefaultTextArea from "@/components/ui/Input/DefaultTextArea";
import BlueButton from "@/components/ui/Button/BlueButton";

export default function EditBoxForm({ updateBox, setUpdateBox }: { updateBox: Box, setUpdateBox: Dispatch<SetStateAction<Box>>}) {
    return (
        <Form
            action={async formData => {
                await fetch("/api/box", {
                    method: "PUT",
                    body: JSON.stringify({
                        id: updateBox.id,
                        name: formData.get("name"),
                        content: formData.get("content"),
                        imageLink: "formData.get('imageLink')",
                        tab: updateBox.tab,
                        width: Number(formData.get("width")),
                        height: Number(formData.get("height")),
                        top: Number(formData.get("top")),
                        left: Number(formData.get("left"))
                    })
                }).then(() => window.location.reload())
                .catch(err => console.log(err));
            }}
            className="flex flex-col gap-2"
        >
            <div className="flex justify-center gap-2">
                <label htmlFor="width" className="font-bold">横幅</label>
                <input 
                    type="range" 
                    name="width" 
                    min={0} 
                    max={100 - updateBox.left} 
                    value={updateBox.width} 
                    onChange={e => setUpdateBox({...updateBox, width: Number(e.target.value)})}
                    className="flex-1"
                />  
            </div>
            <div className="flex justify-center gap-2">
                <label htmlFor="height" className="font-bold">縦幅</label>
                <input 
                    type="range" 
                    name="height" 
                    min={0} 
                    max={100 - updateBox.top} 
                    value={updateBox.height} 
                    onChange={e => setUpdateBox({...updateBox, height: Number(e.target.value)})}
                    className="flex-1"
                />  
            </div>
            <div className="flex justify-center gap-2">
                <label htmlFor="left" className="font-bold">x</label>
                <input 
                    type="range" 
                    name="left" 
                    min={0} 
                    max={100 - updateBox.width} 
                    value={updateBox.left} 
                    onChange={e => setUpdateBox({...updateBox, left: Number(e.target.value)})}
                    className="flex-1"
                />  
            </div>
            <div className="flex justify-center gap-2">
                <label htmlFor="top" className="font-bold">y</label>
                <input 
                    type="range" 
                    name="top" 
                    min={0} 
                    max={100 - updateBox.height} 
                    value={updateBox.top} 
                    onChange={e => setUpdateBox({...updateBox, top: Number(e.target.value)})}
                    className="flex-1"
                />  
            </div>
            <DefaultTextArea
                title="名前"
                name="name"
                value={updateBox.name}
                onChange={e => setUpdateBox({...updateBox, name: e.target.value})}
                label
            />
            <DefaultTextArea
                title="コンテンツ"
                name="content"
                rows={3}
                value={updateBox.content}
                onChange={e => setUpdateBox({...updateBox, content: e.target.value})}
                label
            />
            <div className="pt-4">
                <BlueButton>保存</BlueButton>
            </div>
        </Form>
    )
}