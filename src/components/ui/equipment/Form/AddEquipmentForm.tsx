"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import { TIER } from "@/lib/types";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";
import DefaultTextArea from "../../global/Form/DefaultTextArea";
import DefaultSelect from "../../global/Form/DefaultSelect";
import { uploadFiles } from "@/lib/utils";
import DefaultAddableOption from "../../global/Form/DefaultAddableOption";
import DefaultFile from "../../global/Form/DefaultFile";
import { useActionState } from 'react';
import { TIER_LABELS } from "@/lib/const";

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
            <DefaultTextArea
                title="説明"
                name="description"
                label
            />
            <DefaultTextArea
                title="場所"
                name="loocation"
                label
            />
            <DefaultFile title="添付ファイル" name="file" />
            <DefaultAddableOption title="タグ" name="tag" />
            <DefaultSelect
                title="対象"
                name="tier"
                options={[
                    { value: TIER.STUDENT, label: `${TIER_LABELS[TIER.STUDENT]}向け` },
                    { value: TIER.ADMIN, label: `${TIER_LABELS[TIER.ADMIN]}向け` },
                ]}
            />
            <div className="pt-4">
                <BlueButton disabled={pending}>{pending ? "保存中..." : "保存"}</BlueButton>
            </div>
        </Form>
    )
}
