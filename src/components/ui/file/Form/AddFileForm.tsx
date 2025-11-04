"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import { FILE_CATEGORY, TIER } from "@/lib/type";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";
import DefaultSelect from "../../global/Form/DefaultSelect";
import DefaultTags from "../../global/Form/DefaultTags";

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
            <DefaultTags />
            <DefaultSelect
                title="対象"
                name="tier"
                options={[
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
