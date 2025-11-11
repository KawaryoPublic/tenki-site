"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import { TIER } from "@/lib/type";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";
import DefaultSelect from "../../global/Form/DefaultSelect";
import DefaultAddableOption from "../../global/Form/DefaultAddableOption";

export default function AddFileForm() {
    return (
        <Form 
            action={async data => {
                await fetch('/api/file', {
                    method: 'POST',
                    body: data
                }).catch(err => console.log(err));

                redirect(`/file`)
            }}
            className="flex flex-col gap-2"
        >   
            <h2 className="text-xl md:text-3xl font-bold border-b pb-2">ファイルを編集</h2>
            <DefaultInput
                title="タイトル"
                name="title"
                required
                label
            />
            <DefaultInput
                title="URL"
                name="url"
                required
                label
            />
            <DefaultAddableOption title="タグ" name="tag" />
            <DefaultSelect
                title="対象"
                name="tier"
                options={[
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
