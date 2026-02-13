"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import { Notification } from "@/lib/types";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";
import DefaultTextArea from "../../global/Form/DefaultTextArea";
import DefaultSelect from "../../global/Form/DefaultSelect";
import DefaultAddableInput from "../../global/Form/DefaultAddableOption";
import DefaultFile from "../../global/Form/DefaultFile";
import { useState, useActionState } from "react";
import { uploadFiles } from "@/lib/utils";
import { ROLE_LABELS, TIER_LABELS } from "@/lib/const";
import DefaultAddableSelect from "../../global/Form/DefaultAddableSelectOption";

export default function EditNotificationForm({ notification }: { notification: Notification }) {
    const initialFiles = notification.urls.map((url, index) => ({ url: url, filename: notification.filenames[index] }));
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

        for(const role of formData.getAll("role")) {
            formData.append("roleName", ROLE_LABELS[Number(role)]);
        }

        await fetch(`/api/notification?id=${notification.id}`, {
            method: 'PUT',
            body: formData,
        }).catch(err => {
            console.log(err);
            alert('保存に失敗しました。');
        });

        redirect(`/notification/${notification.id}`);
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
                defaultValue={notification.title}
                required
                label
            />
            <DefaultTextArea
                title="内容"
                name="content"
                defaultValue={notification.content}
                label
            />
            <DefaultFile title="添付ファイル" name="file" defaultFiles={files} setDefaultFiles={setFiles} />
            <DefaultAddableInput title="タグ" name="tag" defaultValues={notification.tags} />
            <DefaultAddableSelect 
                title="役職" 
                name="role" 
                defaultValues={notification.roles}
                options={ROLE_LABELS.map((role, i) => ({ value: i, label: role}))} 
            />
            <DefaultSelect
                title="対象"
                name="tier"
                defaultValue={notification.tier}
                options={TIER_LABELS.map((value, i) => ({ value: i, label: value }))}
                label
                required
            />
            <div className="pt-4">
                <BlueButton disabled={pending}>{pending ? "保存中..." : "保存"}</BlueButton>
            </div>
        </Form>
    )
}
