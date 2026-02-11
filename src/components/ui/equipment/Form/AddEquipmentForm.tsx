import Form from "next/form";
import { redirect } from "next/navigation";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";
import DefaultTextArea from "../../global/Form/DefaultTextArea";
import DefaultSelect from "../../global/Form/DefaultSelect";
import { uploadFiles } from "@/lib/utils";
import DefaultAddableInput from "../../global/Form/DefaultAddableOption";
import DefaultFile from "../../global/Form/DefaultFile";
import { useActionState } from 'react';
import { Location } from "@/lib/types";
import DefaultVectorInput from "../../global/Form/DefaultVectorInput";

export default function AddEquipmentForm({ locations }: { locations: Location[] }) {
    const [state, formAction, pending] = useActionState(async (initState: any, formData: FormData) => {
        formData = await uploadFiles(formData);

        await fetch("/api/equipment", {
            method: 'POST',
            body: formData,
        }).catch(err => {
            console.log(err);
            alert('保存に失敗しました。');
        });

        redirect("/equipment");
    }, null);

    return (
        <Form 
            action={formAction}
            className="flex flex-col gap-2"
        >   
            <h2 className="text-xl md:text-3xl font-bold border-b pb-2">機材を追加</h2>
            <DefaultInput
                title="名前"
                name="name"
                required
                label
            />
            <DefaultSelect
                title="場所"
                name="locationId"
                options={locations.map(location => ({ value: location.id, label: location.name }))}
                label
            />
            <DefaultInput
                title="個数"
                name="number"
                type="number"
                defaultValue="1"
                required
                label
            />
            <DefaultVectorInput title="サイズ[cm]" name="size" labels={["縦幅", "横幅", "高さ"]} />
            <DefaultAddableInput title="内容物" name="content" />
            <DefaultTextArea
                title="説明"
                name="description"
                label
            />
            <DefaultFile title="添付ファイル" name="file" />
            <DefaultAddableInput title="タグ" name="tag" />
            <div className="pt-4">
                <BlueButton disabled={pending}>{pending ? "保存中..." : "保存"}</BlueButton>
            </div>
        </Form>
    )
}
