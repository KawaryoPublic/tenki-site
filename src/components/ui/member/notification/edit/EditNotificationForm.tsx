"use client";

import Form from "next/form";
import BlueButton from "@/components/ui/global/button/BlueButton";
import { redirect } from "next/navigation";
import DefaultTextArea from "@/components/ui/global/form/DefaultTextArea";

export default function NotificationEditForm() {
    return (
        <Form 
            action={async (data: FormData) => {
                await fetch('/api/notifications', {
                    method: 'POST',
                    body: JSON.stringify({
                        title: data.get('title'),
                        content: data.get('content'),
                    }),
                }).catch(err => console.log(err));

                redirect(`/notification`)
            }}
            className="flex flex-col gap-2"
        >   
            <DefaultTextArea
                title="タイトル"
                name="title"
                rows={1}
                label
            />
            <DefaultTextArea
                title="内容"
                name="content"
                rows={3}
                label
            />
            <div className="pt-4">
                <BlueButton>追加</BlueButton>
            </div>
        </Form>
    )
}
