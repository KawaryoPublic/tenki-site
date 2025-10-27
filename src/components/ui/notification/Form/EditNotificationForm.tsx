"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import { Notification, TIER } from "@/lib/type";
import { useState, useEffect } from "react";
import BlueButton from "../../global/Button/BlueButton";
import { DefaultInput } from "../../global/Input/DefaultInput";
import { DefaultTextArea } from "../../global/Input/DefaultTextArea";

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
                label
            />
            <DefaultTextArea
                title="内容"
                name="content"
                rows={3}
                defaultValueOrValueAndOnChange={notification.content}
                label
            />
            <div className="text-gray-900 flex flex-col gap-1">
                <label htmlFor="tier" className="font-bold">対象</label>
                <select name="tier" className="bg-gray-300 w-full border border-gray-600 rounded-md px-2 py-1 flex-1" defaultValue={notification.tier as TIER}>
                    <option value={TIER.NONE}>一般向け</option>
                    <option value={TIER.PARENT}>保護者向け</option>
                    <option value={TIER.STUDENT}>生徒向け</option>
                    <option value={TIER.ADMIN}>執行部向け</option>
                </select>
            </div>
            <div className="pt-4">
                <BlueButton>変更</BlueButton>
            </div>
        </Form>
    )
}
