"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import { File, FILE_CATEGORY, TIER } from "@/lib/type";
import { useState, useEffect } from "react";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInputWithDefaultValue";
import DefaultTextArea from "../../global/Form/DefaultTextAreaWithDefaultValue";
import DefaultSelect from "../../global/Form/DefaultSelect";

export default function EditFileForm({ id }: { id: number }) {
    const [ file, setFile ] = useState<File | null>(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        fetch(`/api/file?id=${id}`)
            .then(res => res.json())
            .then(data => setFile(data))
            .finally(() => setLoading(false))
            .catch(err => console.error(err))
    }, []);

    return (
        loading ? <div>Loading...</div> :
        file ? <div>File not Found</div> :
        <Form 
            action={async (data: FormData) => {
                await fetch("/api/file", {
                    method: 'PUT',
                    body: JSON.stringify({
                        id: id,
                        title: data.get("title"),
                        url: data.get("url"),
                        tags: [data.get("tags"), "仮タグ"],
                        tier: data.get("tier"),
                    }),
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
            <DefaultInput
                title="タグ"
                name="tags"
                label
            />
            <DefaultSelect
                title="種類"
                name="tier"
                options={[
                    { value: FILE_CATEGORY.OTHER, label: 'その他' },
                    { value: FILE_CATEGORY.DOCUMENT, label: 'ドキュメント  ' },
                    { value: FILE_CATEGORY.IMAGE, label: '画像' },
                    { value: FILE_CATEGORY.VIDEO, label: '動画' },
                    { value: FILE_CATEGORY.LINK, label: 'リンク' },
                ]}
            />  
            <DefaultSelect
                title="対象"
                name="tier"
                options={[
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
