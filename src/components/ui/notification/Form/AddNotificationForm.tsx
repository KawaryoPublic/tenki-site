"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import { TIER } from "@/lib/type";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Input/DefaultInputWithDefaultValue";
import DefaultTextArea from "../../global/Input/DefaultTextAreaWithDefaultValue";

export default function AddNotificationForm() {
    return (
        <Form 
            action={async (data: FormData) => {
                await fetch('/api/notification', {
                    method: 'POST',
                    body: JSON.stringify({
                        title: data.get('title'),
                        content: data.get('content'),
                        tier: data.get('tier')
                    }),
                }).catch(err => console.log(err));

                redirect(`/notification`)
            }}
            className="flex flex-col gap-2"
        >   
            <DefaultInput
                title="タイトル"
                name="title"
                label
            />
            <DefaultTextArea
                title="内容"
                name="content"
                rows={3}
                label
            />
            <div className="text-gray-900 flex flex-col gap-1">
                <label htmlFor="tier" className="font-bold">対象</label>
                <select name="tier" className="bg-gray-300 w-full border border-gray-600 rounded-md px-2 py-1 flex-1" >
                    <option value={TIER.NONE}>一般向け</option>
                    <option value={TIER.PARENT}>保護者向け</option>
                    <option value={TIER.STUDENT}>生徒向け</option>
                    <option value={TIER.ADMIN}>執行部向け</option>
                </select>
            </div>
            <div className="pt-4">
                <BlueButton>追加</BlueButton>
            </div>
        </Form>
    )
}
