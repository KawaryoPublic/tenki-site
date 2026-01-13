"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";
import DefaultTextArea from "../../global/Form/DefaultTextArea";
import DefaultSelect from "../../global/Form/DefaultSelect";
import { uploadFiles } from "@/lib/utils";
import DefaultAddableOption from "../../global/Form/DefaultAddableOption";
import DefaultFile from "../../global/Form/DefaultFile";
import { useActionState } from 'react';
import { LOCATIONS_LABELS } from "@/lib/const";

export default function AddEquipmentForm() {
    const [state, formAction, pending] = useActionState(async (initState: any, formData: FormData) => {
        formData = await uploadFiles(formData);

        await fetch("/api/equipment", {
            method: 'POST',
            body: formData,
        }).catch(err => {
            console.log(err);
            alert('保存に失敗しました。');
        });

        redirect("/equipment");
    }, null);

    return (
        <Form 
            action={formAction}
            className="flex flex-col gap-2"
        >   
            <h2 className="text-xl md:text-3xl font-bold border-b pb-2">機材を追加</h2>
            <DefaultInput
                title="名前"
                name="name"
                required
                label
            />
            <DefaultSelect
                title="場所"
                name="location"
                options={Object.entries(LOCATIONS_LABELS).map(([value, label]) => ({ value, label }))}
            />
            <DefaultInput
                title="名前"
                name="name"
                type="number"
                required
                label
            />
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <label className="font-bold">縦</label>
                    <DefaultInput
                        title="縦"
                        name="size"
                        type="number"
                        required
                    />
                </div>
                <div className="flex gap-2 items-center">
                    <label className="font-bold">横</label>
                    <DefaultInput
                        title="横"
                        name="size"
                        type="number"
                        required
                    />
                </div>
                <div className="flex gap-2 items-center">
                    <label className="font-bold">高さ</label>
                    <DefaultInput
                        title="高さ"
                        name="size"
                        type="number"
                        required
                    />
                </div>
            </div>
            <DefaultAddableOption title="内容物" name="content" />
            <DefaultTextArea
                title="説明"
                name="description"
                required
                label
            />
            <DefaultFile title="添付ファイル" name="file" />
            <DefaultAddableOption title="タグ" name="tag" />
            <div className="pt-4">
                <BlueButton disabled={pending}>{pending ? "保存中..." : "保存"}</BlueButton>
            </div>
        </Form>
    )
}
