"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import { Role } from "@/lib/types";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";
import DefaultTextArea from "../../global/Form/DefaultTextArea";
import { useState, useActionState } from "react";
import { uploadFiles } from "@/lib/utils";
import RoleFile from "./RoleFile";

export default function EditRoleForm({ role }: { role: Role }) {
    const [ markUrlChanged, setMarkUrlChanged ] = useState(false);
    const [ personImageUrlChanged, setPersonImageUrlChanged ] = useState(false);
    const [state, formAction, pending] = useActionState(async (initState: any, formData: FormData) => {
        if(markUrlChanged) {
            formData.append("deleteFileUrl", role.markUrl);
        } else {
            formData.append("markUrl", role.markUrl);
        }

        if(personImageUrlChanged) {
            formData.append("deleteFileUrl", role.personImageUrl);
        } else {
            formData.append("personImageUrl", role.personImageUrl);
        }

        
        formData = await uploadFiles(formData);

        await fetch(`/api/role?id=${role.id}`, {
            method: 'PUT',
            body: formData,
        }).catch(err => {
            console.log(err);
            alert('保存に失敗しました。');
        });

        redirect(`/role/${role.id}`);
    }, null);

    return (
        <Form 
            action={formAction}
            className="flex flex-col gap-2"
        >   
            <h2 className="text-xl md:text-3xl font-bold border-b pb-2">告知を編集</h2>
            {personImageUrlChanged ? "true" : "false"}
            <DefaultInput
                title="役職名"
                name="name"
                defaultValue={role.name}
                required
                label
            />
            <DefaultTextArea
                title="概要"
                name="description"
                defaultValue={role.description}
                label
            />
            <RoleFile
                title="役職のマーク"
                defaultFile={{ url: role.markUrl, filename: "役職のマーク" }}
                changed={markUrlChanged}
                setChanged={setMarkUrlChanged}
            />
            <DefaultInput
                title="チーフ名"
                name="person"
                defaultValue={role.person}
                required
                label
            />
            <DefaultTextArea
                title="チーフの紹介"
                name="personDetail"
                defaultValue={role.personDetail}
                label
            />
            <RoleFile
                title="チーフ紹介の画像"
                defaultFile={{ url: role.personImageUrl, filename: "チーフ紹介の画像" }}
                changed={personImageUrlChanged}
                setChanged={setPersonImageUrlChanged}
            />
            <div className="pt-4">
                <BlueButton disabled={pending}>{pending ? "保存中..." : "保存"}</BlueButton>
            </div>
        </Form>
    )
}
