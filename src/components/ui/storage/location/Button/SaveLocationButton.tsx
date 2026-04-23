"use client";

import BlueButton from "@/components/ui/global/Button/BlueButton";
import { Shelf } from "@/lib/types";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function SaveLocationButton({ id, shelves }: { id: number, shelves: {shelf: Shelf, state: "none" | "added" | "updated" | "deleted"}[] }) {
    const [ saving, setSaving ] = useState(false);

    return (
        <BlueButton
            disabled={saving}
            onClick={async () => {
                setSaving(true);

                await fetch(`/api/storage/shelf`, {
                    method: 'POST',
                    body: JSON.stringify({
                        shelves: shelves.filter(s => s.state === "added").map(s => s.shelf),
                        locationId: id,
                    }),
                }).catch(err => {
                    console.log(err);
                    alert('保存に失敗しました。');
                });

                await fetch(`/api/storage/shelf`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        shelves: shelves.filter(s => s.state === "updated").map(s => s.shelf),
                        locationId: id,
                    }),
                }).catch(err => {
                    console.log(err);
                    alert('保存に失敗しました。');
                });

                await fetch(`/api/storage/shelf`, {
                    method: 'DELETE',
                    body: JSON.stringify({
                        shelves: shelves.filter(s => s.state === "deleted").map(s => s.shelf),
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