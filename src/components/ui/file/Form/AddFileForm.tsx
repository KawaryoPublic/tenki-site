"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import { FILE_CATEGORY, TIER } from "@/lib/type";
import BlueButton from "../../global/Button/BlueButton";
import { DefaultInput } from "../../global/Input/DefaultInput";

export default function AddFileForm() {
    return (
        <Form 
            action={async (data: FormData) => {
                await fetch('/api/file', {
                    method: 'POST',
                    body: JSON.stringify({
                        title: data.get('title'),
                        url: data.get('url'),
                        category: data.get('category'),
                        tags: [data.get('tags'), "仮タグ"],
                        tier: data.get('tier')
                    }),
                }).catch(err => console.log(err));

                redirect(`/file`)
            }}
            className="flex flex-col gap-2"
        >   
            <DefaultInput
                title="タイトル"
                name="title"
                label
            />
            <DefaultInput
                title="URL"
                name="url"
                label
            />
            <DefaultInput
                title="タグ"
                name="tags"
                label
            />
            <div className="text-gray-900 flex flex-col gap-1">
                <label htmlFor="category" className="font-bold">カテゴリー</label>
                <select name="category" className="bg-gray-300 w-full border border-gray-600 rounded-md px-2 py-1 flex-1" >
                    <option value={FILE_CATEGORY.OTHER}>その他</option>
                    <option value={FILE_CATEGORY.IMAGE}>画像</option>
                    <option value={FILE_CATEGORY.VIDEO}>動画</option>
                    <option value={FILE_CATEGORY.DOCUMENT}>	ドキュメント</option>
                    <option value={FILE_CATEGORY.LINK}>リンク</option>
                </select>
            </div>
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
