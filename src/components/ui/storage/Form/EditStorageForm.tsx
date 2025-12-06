"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import { Storage } from "@/lib/types";
import BlueButton from "../../global/Button/BlueButton";
import DefaultAddableOption from "../../global/Form/DefaultAddableOption";
import { useActionState } from "react";
import { uploadFiles } from "@/lib/utils";
import DefaultInput from "../../global/Form/DefaultInput";

export default function EditStorageForm({ storage }: { storage: Storage }) {
    const [state, formAction, pending] = useActionState(async (initState: any, formData: FormData) => {
        formData.append("deleteFileUrl", storage.url);

        formData = await uploadFiles(formData);

        await fetch(`/api/storage?id=${storage.id}`, {
            method: 'PUT',
            body: formData,
        }).catch(err => {
            console.log(err);
            alert('保存に失敗しました。');
        });

        redirect(`/storage?id=${storage.id}`);
    }, null);

    return (
        <Form 
            action={formAction}
            className="flex flex-col gap-2"
        >   
            <h2 className="text-xl md:text-3xl font-bold border-b pb-2">倉庫を編集</h2>
            <DefaultInput
                title="画像"
                name="file"
                type="file"
                className="flex-1"
            />
            <DefaultAddableOption 
                title="場所" 
                name="location" 
                defaultOptions={storage.locations} 
            />
            <div className="pt-4">
                <BlueButton disabled={pending}>{pending ? "保存中..." : "保存"}</BlueButton>
            </div>
        </Form>
    )
}
