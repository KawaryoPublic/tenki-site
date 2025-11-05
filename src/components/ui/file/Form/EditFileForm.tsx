"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import { File, TIER } from "@/lib/type";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";
import DefaultSelect from "../../global/Form/DefaultSelect";
import DefaultAddableOption from "../../global/Form/DefaultAddableOption";

export default function EditFileForm({ file }: { file: File }) {
    return (
        <Form 
            action={async data => {
                await fetch(`/api/file?id=${file.id}`, {
                    method: 'PUT',
                    body: data,
                }).catch(err => console.log(err));

                redirect(`/file`)
            }}
            className="flex flex-col gap-2"
        >   
            <DefaultInput
                title="タイトル"
                name="title"
                defaultValue={file.title}
                required
                label
            />
            <DefaultInput
                title="URL"
                name="url"
                defaultValue={file.url}
                required
                label
            />
            <DefaultAddableOption title="タグ" name="tag" defaultOptions={file.tags} />
            <DefaultSelect
                title="対象"
                name="tier"
                defaultValue={file.tier}
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
