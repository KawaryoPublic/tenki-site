"use client";

import Form from "next/form";
import { Location } from "@/lib/types";
import { useState, useActionState, Dispatch, SetStateAction } from "react";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import DefaultVectorInput from "@/components/ui/global/Form/DefaultVectorInput";
import DefaultAddableStorage from "../../Form/DefaultAddableOption";

export default function EditLocationForm({ location, setLocation, setDisplayMap }: { location: Location, setLocation: Dispatch<SetStateAction<Location | null>>, setDisplayMap: Dispatch<SetStateAction<boolean>> }) {
    const initShelves = location.shelves.map(shelf => {
        return {
            id: shelf.id,
            name: shelf.name,
            size: shelf.size,
            position: shelf.position
        }
    });
    const [ shelves, setShelves ] = useState(initShelves);
    const [ state, formAction, pending ] = useActionState(async (initState: any, formData: FormData) => {
        await fetch(`/api/storage/location?id=${location.id}`, {
            method: 'PUT',
            body: formData,
        }).catch(err => {
            console.log(err);
            alert('倉庫の保存に失敗しました。');
        });

        for(const initShelf of initShelves) {
            if(!shelves.includes(initShelf)) {
                await fetch(`/api/storage/shelf?id=${initShelf.id}`, {
                    method: 'DELETE',
                }).catch(err => {
                    console.log(err);
                    alert('場所の削除に失敗しました。');
                });
            }
        }

        const names = formData.getAll("option-name") as string[];
        const sizes = formData.getAll("option-size") as string[];
        const positions = formData.getAll("option-position") as string[];

        for(let i = 0; i < names.length; i++) {
            const shelfFormData = new FormData();
            shelfFormData.append("name", names[i]);
            shelfFormData.append("type", "0");
            shelfFormData.append("locationId", location.id.toString());
            shelfFormData.append("size", sizes[2 * i]);
            shelfFormData.append("size", sizes[2 * i + 1]);
            shelfFormData.append("position", positions[2 * i]);
            shelfFormData.append("position", positions[2 * i + 1]);

            await fetch("/api/storage/shelf", {
                method: 'POST',
                body: shelfFormData,
            }).catch(err => {
                console.log(err);
                alert('場所の作成に失敗しました。');
            });
        }

        window.location.reload();
    }, null);

    return (
            <Form 
                action={formAction}
                className="flex flex-col gap-6"
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
                        size[i] = Number(e.target.value);
                        setLocation({...location, size: size});
                    }}
                />
                <DefaultAddableStorage
                    title="場所"
                    defaultOptions={shelves}
                    setDefaultOptions={setShelves}
                    
                />
                <div className="pb-6">
                    <BlueButton disabled={pending}>{pending ? "保存中..." : "保存"}</BlueButton>
                </div>
            </Form>
    )
}
