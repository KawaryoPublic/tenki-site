"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import { Manual, TIER } from "@/lib/types";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";
import DefaultTextArea from "../../global/Form/DefaultTextArea";
import DefaultSelect from "../../global/Form/DefaultSelect";
import DefaultAddableOption from "../../global/Form/DefaultAddableOption";
import DefaultFile from "../../global/Form/DefaultFile";
import { useState, useActionState } from "react";
import { uploadFiles } from "@/lib/utils";
import { TIER_LABELS } from "@/lib/const";

export default function EditManualForm({ manual }: { manual: Manual }) {
    const initialFiles = manual.urls.map((url, index) => ({ url: url, filename: manual.filenames[index] }));
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

        await fetch(`/api/manual?id=${manual.id}`, {
            method: 'PUT',
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
            <h2 className="text-xl md:text-3xl font-bold border-b pb-2">告知を編集</h2>
            <DefaultInput
                title="タイトル"
                name="title"
                defaultValue={manual.title}
                required
                label
            />
            <DefaultTextArea
                title="内容"
                name="content"
                defaultValue={manual.content}
                label
            />
            <DefaultFile title="添付ファイル" name="file" defaultFiles={files} setDefaultFiles={setFiles} />
            <DefaultAddableOption title="タグ" name="tag" defaultOptions={manual.tags} />
            <DefaultSelect
                title="対象"
                name="tier"
                defaultValue={manual.tier}
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
