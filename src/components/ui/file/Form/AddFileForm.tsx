"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";
import DefaultSelect from "../../global/Form/DefaultSelect";
import DefaultAddableOption from "../../global/Form/DefaultAddableOption";
import { useActionState } from 'react';
import { TIER_LABELS } from "@/lib/const";

export default function AddFileForm() {
    const [state, formAction, pending] = useActionState(async (initState: any, formData: FormData) => {
        await fetch('/api/file', {
            method: 'POST',
            body: formData,
        }).catch(err => {
            console.log(err);
            alert('保存に失敗しました。');
        });

        redirect("/file");
    }, null);

    return (
        <Form 
            action={formAction}
            className="flex flex-col gap-2"
        >   
            <h2 className="text-xl md:text-3xl font-bold border-b pb-2">ファイルを編集</h2>
            <DefaultInput
                title="タイトル"
                name="title"
                required
                label
            />
            <DefaultInput
                title="URL"
                name="url"
                required
                label
            />
            <DefaultAddableOption title="タグ" name="tag" />
            <DefaultSelect
                title="対象"
                name="tier"
                options={[
                    { value: 2, label: `${TIER_LABELS[2]}向け` },
                    { value: 3, label: `${TIER_LABELS[3]}向け` },
                ]}
            />
            <div className="pt-4">
                <BlueButton disabled={pending}>{pending ? "保存中..." : "保存"}</BlueButton>
            </div>
        </Form>
    )
}
