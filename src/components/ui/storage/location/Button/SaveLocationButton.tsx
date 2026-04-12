"use client";

import BlueButton from "@/components/ui/global/Button/BlueButton";
import { Shelf } from "@/lib/types";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function SaveLocationButton({ id, shelves }: { id: number, shelves: {shelf: Shelf, updated: boolean}[] }) {
    const [ saving, setSaving ] = useState(false);

    return (
        <BlueButton
            disabled={saving}
            onClick={async () => {
                setSaving(true);

                await fetch(`/api/storage/shelf`, {
                    method: 'POST',
                    body: JSON.stringify({
                        shelves: shelves.filter(s => s.shelf.location == null).map(s => s.shelf),
                        locationId: id,
                    }),
                }).catch(err => {
                    console.log(err);
                    alert('保存に失敗しました。');
                });

                await fetch(`/api/storage/shelf`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        shelves: shelves.filter(s => s.updated && s.shelf.location != null).map(s => s.shelf),
                        locationId: id,
                    }),
                }).catch(err => {
                    console.log(err);
                    alert('保存に失敗しました。');
                });

                redirect(`/storage/location/${id}`);
                setSaving(false);
            }}
        >
            <span className="text-lg md:text-xl p-1 font-bold">{saving ? "保存中..." : "保存"}</span>   
        </BlueButton>
    );
}