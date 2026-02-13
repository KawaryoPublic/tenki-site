"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";
import DefaultTextArea from "../../global/Form/DefaultTextArea";
import DefaultSelect from "../../global/Form/DefaultSelect";
import { uploadFiles } from "@/lib/utils";
import DefaultAddableInput from "../../global/Form/DefaultAddableOption";
import DefaultFile from "../../global/Form/DefaultFile";
import { useActionState } from 'react';
import { TIER_LABELS } from "@/lib/const";

export default function AddManualForm() {
    const [state, formAction, pending] = useActionState(async (initState: any, formData: FormData) => {
        formData = await uploadFiles(formData);

        await fetch("/api/manual", {
            method: 'POST',
            body: formData,
        }).catch(err => {
            console.log(err);
            alert('保存に失敗しました。');
        });

        redirect("/manual");
    }, null);

    return (
        <Form 
            action={formAction}
            className="flex flex-col gap-2"
        >   
            <h2 className="text-xl md:text-3xl font-bold border-b pb-2">マニュアルを追加</h2>
            <DefaultInput
                title="タイトル"
                name="title"
                required
                label
            />
            <DefaultTextArea
                title="内容"
                name="content"
                label
            />
            <DefaultFile title="添付ファイル" name="file" />
            <DefaultAddableInput title="タグ" name="tag" />
            <DefaultSelect
                title="対象"
                name="tier"
                options={[
                    { value: 2, label: `${TIER_LABELS[2]}向け` },
                    { value: 3, label: `${TIER_LABELS[3]}向け` },
                ]}
                label
                required
            />
            <div className="pt-4">
                <BlueButton disabled={pending}>{pending ? "保存中..." : "保存"}</BlueButton>
            </div>
        </Form>
    )
}
