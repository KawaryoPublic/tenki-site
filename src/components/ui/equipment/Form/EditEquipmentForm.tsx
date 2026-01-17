"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import { Equipment } from "@/lib/types";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";
import DefaultTextArea from "../../global/Form/DefaultTextArea";
import DefaultSelect from "../../global/Form/DefaultSelect";
import DefaultAddableOption from "../../global/Form/DefaultAddableOption";
import DefaultFile from "../../global/Form/DefaultFile";
import { useState, useActionState, useEffect } from "react";
import { uploadFiles } from "@/lib/utils";
import { Location } from "@/lib/types";

export default function EditEquipmentForm({ equipment, locations }: { equipment: Equipment, locations: Location[] }) {
    const initialFiles = equipment.urls.map((url, index) => ({ url: url, filename: equipment.filenames[index] }));
    
    const [ files, setFiles ] = useState<{ url: string, filename: string }[]>(initialFiles);
    const [state, formAction, pending] = useActionState(async (initState: any, formData: FormData) => {
        for(const file of initialFiles) {
            if(!files.find(f => f.url === file.url)) {
                formData.append("deleteFileUrl", file.url);
            } else {
                formData.append("url", file.url);
                formData.append("filename", file.filename);
            }
        }

        formData = await uploadFiles(formData);

        await fetch(`/api/equipment?id=${equipment.id}`, {
            method: 'PUT',
            body: formData,
        }).catch(err => {
            console.log(err);
            alert('保存に失敗しました。');
        });

        redirect(`/equipment/${equipment.id}`);
    }, null);



    return (
        <Form 
            action={formAction}
            className="flex flex-col gap-2"
        >   
            <h2 className="text-xl md:text-3xl font-bold border-b pb-2">機材を編集</h2>
            <DefaultInput
                title="名前"
                name="name"
                defaultValue={equipment.name}
                required
                label
            />
            <DefaultSelect
                title="場所"
                name="locationId"
                options={locations.map(location => ({ value: location.id.toString(), label: location.name }))}
                defaultValue={equipment.location.id.toString()}
            />
            <DefaultInput
                title="個数"
                name="number"
                type="number"
                defaultValue={equipment.number.toString()}
                required
                label
            />
            <div>
                <label className="font-bold text-gray-900 text-sm md:text-base flex flex-col gap-1">サイズ[cm]</label>
                <div className="flex flex-col md:flex-row gap-1 md:justify-between md:items-center">
                    <div className="flex gap-2 items-center">
                        <label className="font-bold">縦幅</label>
                        <DefaultInput
                            title="縦幅"
                            name="size"
                            type="number"
                            defaultValue={equipment.size[0].toString()}
                            min={0}
                            required
                        />
                    </div>
                    <div className="flex gap-2 items-center">
                        <label className="font-bold">横幅</label>
                        <DefaultInput
                            title="横幅"
                            name="size"
                            type="number"
                            defaultValue={equipment.size[1].toString()}
                            min={0}
                            required
                        />
                    </div>
                    <div className="flex gap-2 items-center">
                        <label className="font-bold">高さ</label>
                        <DefaultInput
                            title="高さ"
                            name="size"
                            type="number"
                            defaultValue={equipment.size[2].toString()}
                            min={0}
                            required
                        />
                    </div>
                </div>
            </div>
            <DefaultAddableOption
                title="内容物"
                name="content"
                defaultOptions={equipment.contents}
            />
            <DefaultTextArea
                title="説明"
                name="description"
                defaultValue={equipment.description}
                label
            />
            <DefaultFile 
                title="添付ファイル" 
                name="file" 
                defaultFiles={files} 
                setDefaultFiles={setFiles} 
            />
            <DefaultAddableOption 
                title="タグ" 
                name="tag" 
                defaultOptions={equipment.tags} 
            />
            <div className="pt-4">
                <BlueButton disabled={pending}>{pending ? "保存中..." : "保存"}</BlueButton>
            </div>
        </Form>
    )
}
