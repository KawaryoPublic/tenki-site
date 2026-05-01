"use client";

import BlueButton from "@/components/ui/global/Button/BlueButton";
import { Location, Shelf } from "@/lib/types";
import { checkCollision } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function SaveLocationButton({ location, shelves }: { location: Location, shelves: { shelf: Shelf, state: "none" | "added" | "updated" | "deleted" }[] }) {
    const [ saving, setSaving ] = useState(false);

    return (
        <BlueButton
            disabled={saving}
            onClick={async () => {
                const newShelves = shelves.filter(s => s.state !== "deleted").map(s => s.shelf);

                for(const thisShelf of newShelves) {
                    for(let i = 0; i < 2; i++) {
                        if(thisShelf.size[i] + thisShelf.position[i] > location.size[i]) {
                            alert("倉庫とぶつかっています。");
                            return;
                        }
                    }

                    for(const shelf of newShelves) {
                        if(shelf === thisShelf) continue;

                        if(checkCollision(thisShelf.size, thisShelf.position, shelf.size, shelf.position)) {
                            alert(`${shelf.name}と${thisShelf.name}がぶつかります。`);
                            return;
                        }
                    }
                }

                setSaving(true);

                await fetch(`/api/storage/shelf`, {
                    method: 'POST',
                    body: JSON.stringify({
                        shelves: shelves.filter(s => s.state === "added").map(s => s.shelf),
                        locationId: location.id,
                    }),
                }).catch(err => {
                    console.log(err);
                    alert('保存に失敗しました。');
                });

                await fetch(`/api/storage/shelf`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        shelves: shelves.filter(s => s.state === "updated").map(s => s.shelf),
                        locationId: location.id,
                    }),
                }).catch(err => {
                    console.log(err);
                    alert('保存に失敗しました。');
                });

                await fetch(`/api/storage/shelf`, {
                    method: 'DELETE',
                    body: JSON.stringify({
                        shelves: shelves.filter(s => s.state === "deleted").map(s => s.shelf),
                        locationId: location.id,
                    }),
                }).catch(err => {
                    console.log(err);
                    alert('保存に失敗しました。');
                });

                redirect(`/storage/location/${location.id}`);
                setSaving(false);
            }}
        >
            <span className="text-lg md:text-xl p-1 font-bold">{saving ? "保存中..." : "保存"}</span>   
        </BlueButton>
    );
}