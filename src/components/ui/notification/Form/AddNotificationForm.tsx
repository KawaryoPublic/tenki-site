"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import { TIER } from "@/lib/type";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInputWithDefaultValue";
import DefaultTextArea from "../../global/Form/DefaultTextAreaWithDefaultValue";
import DefaultSelect from "../../global/Form/DefaultSelect";

export default function AddNotificationForm() {
    return (
        <Form 
            action={async (data: FormData) => {
                await fetch('/api/notification', {
                    method: 'POST',
                    body: data,
                }).catch(err => console.log(err));

                redirect(`/notification`)
            }}
            className="flex flex-col gap-2"
        >   
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
            <DefaultInput
                title="ファイル"
                name="files"
                type="file"
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
                <BlueButton>追加</BlueButton>
            </div>
        </Form>
    )
}
