"use client";

import Form from "next/form";
import { redirect } from "next/navigation";
import { Equipment, Role } from "@/lib/types";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";
import DefaultTextArea from "../../global/Form/DefaultTextArea";
import DefaultSelect from "../../global/Form/DefaultSelect";
import DefaultAddableInput from "../../global/Form/DefaultAddableOption";
import DefaultFile from "../../global/Form/DefaultFile";
import { useState, useActionState, useEffect } from "react";
import { uploadFiles } from "@/lib/utils";
import { Location } from "@/lib/types";
import DefaultVectorInput from "../../global/Form/DefaultVectorInput";
import DefaultAddableSelect from "../../global/Form/DefaultAddableSelectOption";
import { EQUIPMENT_TYPES } from "@/lib/const";
import DefaultHeadingUI from "../../global/DefaultHeadingUI";

export default function EditEquipmentForm({ equipment, locations, roles }: { equipment: Equipment, locations: Location[], roles: Role[] }) {
    const initialFiles = equipment.urls.map((url, index) => ({ url: url, filename: equipment.filenames[index] }));
    
    const [ files, setFiles ] = useState<{ url: string, filename: string }[]>(initialFiles);
    const [ type, setType ] = useState<string | number>(equipment.type);
    const [ state, formAction, pending ] = useActionState(async (initState: any, formData: FormData) => {
        for(const file of initialFiles) {
            if(!files.find(f => f.url === file.url)) {
                formData.append("deleteFileUrl", file.url);
            } else {
                formData.append("url", file.url);
                formData.append("filename", file.filename);
            }
        }

        formData = await uploadFiles(formData);

        if(formData.get("number") == "") {
            formData.set("number", "999");
        }

        await fetch(`/api/equipment?id=${equipment.id}`, {
            method: 'PUT',
            body: formData,
        }).catch(err => {
            console.log(err);
            alert('保存に失敗しました。');
        });

        redirect(`/equipment/${equipment.id}`);
    }, null);



    return (
        <Form 
            action={formAction}
            className="flex flex-col gap-2"
        >   
            <DefaultHeadingUI className="border-b pb-2">機材を編集</DefaultHeadingUI>
            <DefaultInput
                title="名前"
                name="name"
                defaultValue={equipment.name}
                required
                label
            />
            <DefaultSelect
                title="場所"
                name="locationId"
                options={locations.map(location => ({ value: location.id, label: location.name }))}
                defaultValue={equipment.location.id}
                label
                required
            />
            <DefaultInput
                title="個数"
                name="count"
                type="number"
                defaultValue={equipment.count}
                required
                label
            />
            <DefaultSelect
                title="種類"
                name="type"
                options={EQUIPMENT_TYPES.map((type, i) => ({ value: i, label: type }))}
                value={type}
                onChange={e => setType(Number(e.target.value))}
                label
                required
            />
            {
                type !== 4 && 
                <DefaultInput
                    title="ナンバリング(一番最初の)"
                    name="number"
                    type="number"
                    defaultValue={equipment.number === 999 ? "" : equipment.number}
                    label
                />
            }
            <DefaultVectorInput 
                title="サイズ[cm]" 
                name="size" 
                labels={["縦幅", "横幅", "高さ"]}
                defaultValues={equipment.size} 
            />
            <DefaultAddableInput
                title="内容物"
                name="content"
                defaultValues={equipment.contents}
            />
            <DefaultTextArea
                title="説明"
                name="description"
                defaultValue={equipment.description}
                label
            />
            <DefaultAddableSelect
                title="役職"
                name="role"
                options={roles.map(role => ({ value: role.id, label: role.name }))}
                defaultValues={equipment.roles}
            />
            <DefaultFile 
                title="添付ファイル" 
                defaultFiles={files} 
                setDefaultFiles={setFiles} 
            />
            <DefaultAddableInput 
                title="タグ" 
                name="tag" 
                defaultValues={equipment.tags} 
            />
            <div className="pt-4">
                <BlueButton disabled={pending}>{pending ? "保存中..." : "保存"}</BlueButton>
            </div>
        </Form>
    )
}
