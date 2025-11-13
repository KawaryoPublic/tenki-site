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
import { useState } from "react";

export default function AddNotificationForm() {
    const [ saving, setSaving ] = useState(false);

    return (
        <Form 
            action={async data => {
                data = await uploadFiles(data);

                await fetch('/api/notification', {
                    method: 'POST',
                    body: data,
                }).finally(() => setSaving(false))
                .catch(err => console.log(err));

                redirect(`/notification`)
            }}
            className="flex flex-col gap-2"
        >   
            <h2 className="text-xl md:text-3xl font-bold border-b pb-2">告知を追加</h2>
            <DefaultInput
                title="タイトル"
                name="title"
                required
                label
            />
            <DefaultTextArea
                title="内容"
                name="content"
                rows={3}
                label
            />
            <DefaultFile title="添付ファイル" name="file" />
            <DefaultAddableOption title="タグ" name="tag" />
            <DefaultSelect
                title="対象"
                name="tier"
                options={[
                    { value: TIER.NONE, label: '一般向け' },
                    { value: TIER.PARENT, label: '保護者向け' },
                    { value: TIER.STUDENT, label: '生徒向け' },
                    { value: TIER.ADMIN, label: '執行部向け' },
                ]}
            />
            <div className="pt-4">
                <BlueButton onClick={() => setSaving(true)} disabled={saving}>{saving ? "保存中..." : "保存"}</BlueButton>
            </div>
        </Form>
    )
}
