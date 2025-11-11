"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import { TIER } from "@/lib/type";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";
import DefaultTextArea from "../../global/Form/DefaultTextArea";
import DefaultSelect from "../../global/Form/DefaultSelect";
import { uploadFiles } from "@/lib/util";
import DefaultAddableOption from "../../global/Form/DefaultAddableOption";

export default function AddNotificationForm() {
    return (
        <Form 
            action={async data => {
                data = await uploadFiles(data);

                await fetch('/api/notification', {
                    method: 'POST',
                    body: data,
                }).catch(err => console.log(err));


                redirect(`/notification`)
            }}
            className="flex flex-col gap-2"
        >   
            <h2 className="text-xl lg:text-3xl font-bold border-b pb-2">告知を追加</h2>
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
            <DefaultAddableOption
                title="添付ファイル"
                name="file"
                type="file"
            />
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
                <BlueButton>保存</BlueButton>
            </div>
        </Form>
    )
}
