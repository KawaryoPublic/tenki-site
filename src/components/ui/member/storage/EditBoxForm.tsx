"use client";

import { Box } from "@/lib/type";
import Form from "next/form";
import { Dispatch, SetStateAction } from "react";
import DefaultTextArea from "../../global/form/DefaultTextArea";
import BlueButton from "../../global/button/BlueButton";

export default function EditBoxForm({ updateBox, setUpdateBox }: { updateBox: Box, setUpdateBox: Dispatch<SetStateAction<Box>>}) {
    return (
        <Form
            action={async formData => {
                await fetch("/api/box", {
                    method: "PUT",
                    body: JSON.stringify({
                        id: updateBox.id,
                        name: formData.get("name"),
                        number: formData.get("number"),
                        annotation: formData.get("annotation"),
                        link: formData.get("link"),
                        floor: updateBox.floor,
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
                rows={1}
                value={updateBox.name}
                onChange={e => setUpdateBox({...updateBox, name: e.target.value})}
            />
            <DefaultTextArea
                title="個数"
                name="number"
                rows={1}
                value={updateBox.number}
                onChange={e => setUpdateBox({...updateBox, number: e.target.value})}
            />
            <DefaultTextArea
                title="注記"
                name="annotation"
                rows={1}
                value={updateBox.annotation}
                onChange={e => setUpdateBox({...updateBox, annotation: e.target.value})}
            />
            <DefaultTextArea
                title="リンク"
                name="link"
                rows={1}
                value={updateBox.link}
                onChange={e => setUpdateBox({...updateBox, link: e.target.value})}
            />
            <BlueButton>保存</BlueButton>
        </Form>
    )
}