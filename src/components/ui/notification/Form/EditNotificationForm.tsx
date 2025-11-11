"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import { Notification, TIER } from "@/lib/type";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";
import DefaultTextArea from "../../global/Form/DefaultTextArea";
import DefaultSelect from "../../global/Form/DefaultSelect";
import DefaultAddableOption from "../../global/Form/DefaultAddableOption";
import DefaultFile from "../../global/Form/DefaultFile";
import { useState } from "react";
import { uploadFiles } from "@/lib/util";

export default function EditNotificationForm({ notification }: { notification: Notification }) {
    const initialFiles = notification.urls.map((url, index) => ({ url: url, filename: notification.filenames[index] }));
    const [ files, setFiles ] = useState<{ url: string, filename: string }[]>(initialFiles);

    return (
        <Form 
            action={async data => {
                data = await uploadFiles(data);

                for(const deleteFile of initialFiles.filter(file => !files.some(f => f.url === file.url))) {
                    data.append('deleteFileUrl', deleteFile.url);
                }

                await fetch(`/api/notification?id=${notification.id}`, {
                    method: 'PUT',
                    body: data,
                }).catch(err => console.log(err));

                redirect(`/notification`)
            }}
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
                rows={3}
                defaultValue={notification.content}
                label
            />
            <DefaultFile title="添付ファイル" name="file" defaultFiles={files} setDefaultFiles={setFiles} />
            <DefaultAddableOption title="タグ" name="tag" defaultOptions={notification.tags} />
            <DefaultSelect
                title="対象"
                name="tier"
                defaultValue={notification.tier}
                options={[
                    { value: TIER.NONE, label: '一般向け' },
                    { value: TIER.PARENT, label: '保護者向け' },
                    { value: TIER.STUDENT, label: '生徒向け' },
                    { value: TIER.ADMIN, label: '執行部向け' },
                ]}
            />
            <div className="pt-4">
                <BlueButton>保存</BlueButton>
            </div>
        </Form>
    )
}
