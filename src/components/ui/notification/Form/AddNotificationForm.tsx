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
import { ROLE_LABELS, TIER_LABELS } from "@/lib/const";
import DefaultAddableSelect from "../../global/Form/DefaultAddableSelectOption";

export default function AddNotificationForm() {
    const [state, formAction, pending] = useActionState(async (initState: any, formData: FormData) => {
        formData = await uploadFiles(formData);

        for(const role of formData.getAll("role")) {
            formData.append("roleName", TIER_LABELS[Number(role)]);
        }

        await fetch("/api/notification", {
            method: 'POST',
            body: formData,
        }).catch(err => {
            console.log(err);
            alert('保存に失敗しました。');
        });

        redirect("/notification");
    }, null);

    return (
        <Form 
            action={formAction}
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
                label
            />
            <DefaultFile title="添付ファイル" name="file" />
            <DefaultAddableInput title="タグ" name="tag" />
            <DefaultAddableSelect 
                title="役職" 
                name="role" 
                options={ROLE_LABELS.map((role, i) => ({ value: i, label: role}))} 
            />
            <DefaultSelect
                title="対象"
                name="tier"
                options={TIER_LABELS.map((value, i) => ({ value: i, label: value }))}
                defaultValue={2}
                label
            />
            <div className="pt-4">
                <BlueButton disabled={pending}>{pending ? "保存中..." : "保存"}</BlueButton>
            </div>
        </Form>
    )
}
