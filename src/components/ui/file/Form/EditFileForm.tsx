"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import { File, TIER } from "@/lib/types";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";
import DefaultSelect from "../../global/Form/DefaultSelect";
import DefaultAddableOption from "../../global/Form/DefaultAddableOption";
import { useActionState } from 'react';
import { TIER_LABELS } from "@/lib/const";

export default function EditFileForm({ file }: { file: File }) {
    const [state, formAction, pending] = useActionState(async (initState: any, formData: FormData) => {
        await fetch(`/api/file?id=${file.id}`, {
            method: 'PUT',
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
                defaultValue={file.title}
                required
                label
            />
            <DefaultInput
                title="URL"
                name="url"
                defaultValue={file.url}
                required
                label
            />
            <DefaultAddableOption title="タグ" name="tag" defaultOptions={file.tags} />
            <DefaultSelect
                title="対象"
                name="tier"
                defaultValue={file.tier}
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
