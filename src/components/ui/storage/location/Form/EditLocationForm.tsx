"use client";

import Form from "next/form";
import { Location } from "@/lib/types";
import { useActionState, Dispatch, SetStateAction } from "react";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import DefaultVectorInput from "@/components/ui/global/Form/DefaultVectorInput";
import DeleteShelfButton from "../../shelf/Button/DeleteShelfButton";
import Link from "next/link";

export default function EditLocationForm({ location, setLocation, setDisplayMap }: { location: Location, setLocation: Dispatch<SetStateAction<Location | null>>, setDisplayMap: Dispatch<SetStateAction<boolean>> }) {
    const [state, formAction, pending] = useActionState(async (initState: any, formData: FormData) => {
    
        await fetch(`/api/storage/location?id=${location.id}`, {
            method: 'PUT',
            body: formData,
        }).catch(err => {
            console.log(err);
            alert('保存に失敗しました。');
        });

        window.location.reload();
    }, null);

    return (
        <Form 
            action={formAction}
            className="flex flex-col gap-2"
        >   
            <h2 className="flex items-center border-b pb-2">
                <span className="text-xl md:text-3xl font-bold">倉庫を編集</span>
                <BlueButton type="button" className="ml-auto" onClick={() => setDisplayMap(true)}>地図を表示</BlueButton>
            </h2>
            <DefaultVectorInput
                title="サイズ[cm]"
                name="size"
                labels={["縦幅", "横幅"]}
                values={location.size}
                onChange={(e, i) => {
                    const size = location.size;
                    size[i] = e.target.value;
                    setLocation({...location, size: size});
                }}
            />
            <div className="pt-4 pb-6">
                <BlueButton disabled={pending}>{pending ? "保存中..." : "保存"}</BlueButton>
            </div>
            <h2 className="text-xl md:text-3xl font-bold border-b pb-2">場所を編集</h2>
            <label className="font-bold">場所</label>
            {
                location.shelves.map((shelf, i) => (
                    <div key={i} className="flex gap-2">
                        <Link href={`/storage/shelf/${shelf.id}`} className="flex-1 border rounded-md px-2 py-1 whitespace-nowrap">{shelf.name}</Link>
                        <DeleteShelfButton locationId={location.id} shelfId={shelf.id} />
                    </div>
                ))
            }
            <div className="pt-4">
                <BlueButton href={`/storage/shelf/add`}>追加</BlueButton>
            </div>
        </Form>
    )
}
