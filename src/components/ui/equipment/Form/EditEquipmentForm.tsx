"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import { Equipment, TIER } from "@/lib/types";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";
import DefaultTextArea from "../../global/Form/DefaultTextArea";
import DefaultSelect from "../../global/Form/DefaultSelect";
import DefaultAddableOption from "../../global/Form/DefaultAddableOption";
import DefaultFile from "../../global/Form/DefaultFile";
import { useState, useActionState } from "react";
import { uploadFiles } from "@/lib/utils";
import { LOCATIONS_LABELS as LOCATIONS, TIER_LABELS } from "@/lib/const";

export default function EditEquipmentForm({ equipment }: { equipment: Equipment }) {
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
                name="loocation"
                defaultValue={equipment.location}
                options={[
                    ...LOCATIONS
                ]}
            />
            <DefaultAddableOption
                title="内容物"
                name="content"
                defaultOptions={equipment.contents}
            />
            <DefaultTextArea
                title="説明"
                name="description"
                defaultValue={equipment.description || ""}
                required
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
