"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";
import DefaultTextArea from "../../global/Form/DefaultTextArea";
import { useActionState } from "react";
import { uploadFiles } from "@/lib/utils";
import RoleFile from "./RoleFile";

export default function AddRoleForm() {
    const [state, formAction, pending] = useActionState(async (initState: any, formData: FormData) => {
        formData = await uploadFiles(formData);

        await fetch("/api/role", {
            method: 'POST',
            body: formData,
        }).catch(err => {
            console.log(err);
            alert('保存に失敗しました。');
        });

        redirect(`/role`);
    }, null);

    return (
        <Form 
            action={formAction}
            className="flex flex-col gap-2"
        >   
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold border-b pb-2">告知を編集</h2>
            <DefaultInput
                title="役職名"
                name="name"
                required
                label
            />
            <DefaultTextArea
                title="概要"
                name="description"
                label
            />
            <RoleFile title="役職のマーク" />
            <DefaultInput
                title="チーフ名"
                name="person"
                required
                label
            />
            <DefaultTextArea
                title="チーフの紹介"
                name="personDetail"
                label
            />
            <RoleFile title="チーフ紹介の画像" />
            <div className="pt-4">
                <BlueButton disabled={pending}>{pending ? "保存中..." : "保存"}</BlueButton>
            </div>
        </Form>
    )
}
