"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import { Notification, TIER } from "@/lib/type";
import { useState, useEffect } from "react";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInputWithDefaultValue";
import DefaultTextArea from "../../global/Form/DefaultTextAreaWithDefaultValue";
import DefaultSelect from "../../global/Form/DefaultSelect";

export default function EditNotificationForm({ id }: { id: number }) {
    const [ notification, setNotification ] = useState<Notification>({id: -1, title: "", content: "", tier: "", updatedAt: new Date()});

    useEffect(() => {
        fetch(`/api/notification?id=${id}`)
            .then(res => res.json())
            .then(data => setNotification(data))
            .catch(err => console.error(err))
    }, []);

    return (
        notification.id === -1 ? <div>Loading...</div> :
        <Form 
            action={async (data: FormData) => {
                await fetch("/api/notification", {
                    method: 'PUT',
                    body: JSON.stringify({
                        id: id,
                        title: data.get("title"),
                        content: data.get("content"),
                        tier: data.get("tier"),
                    }),
                }).catch(err => console.log(err));

                redirect(`/notification`)
            }}
            className="flex flex-col gap-2"
        >   
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
                <BlueButton>変更</BlueButton>
            </div>
        </Form>
    )
}
