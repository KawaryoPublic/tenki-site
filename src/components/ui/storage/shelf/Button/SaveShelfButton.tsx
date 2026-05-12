"use client";

import BlueButton from "@/components/ui/global/Button/BlueButton";
import { EquipmentInstance, Shelf } from "@/lib/types";
import { checkCollision } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function SaveShelfButton({ shelf, shelfEquipment, height }: { shelf: Shelf, shelfEquipment: { equipment: EquipmentInstance, state: "none" | "added" | "updated" | "deleted" }[], height: number }) {
    const [ saving, setSaving ] = useState(false);

    return (
        <BlueButton
            disabled={saving}
            onClick={async () => {
                const newEquipment = shelfEquipment.filter(s => s.state !== "deleted").map(s => s.equipment);

                for(const thisEquipment of newEquipment) {
                    for(let i = 0; i < 2; i++) {
                        if(thisEquipment.size[i] + thisEquipment.position[i] > shelf.size[i]) {
                            alert("棚とぶつかっています。");
                            return;
                        }
                    }

                    for(const equipment of newEquipment) {
                        if(equipment === thisEquipment) continue;

                        if(checkCollision(thisEquipment.size, thisEquipment.position, equipment.size, equipment.position)) {
                            //alert(`${equipment.name}と${thisEquipment.name}がぶつかります。`);
                            //return;
                        }
                    }
                }

                setSaving(true);

                shelf.equipment = newEquipment;

                await fetch(`/api/storage/shelf?id=${shelf.id}`, {
                    method: "PUT",
                    body: JSON.stringify(shelf)
                });

                redirect(`/storage/shelf/${shelf.id}?height=${height}`);
                setSaving(false);
            }}
        >
            <span className="text-lg md:text-xl p-1 font-bold">{saving ? "保存中..." : "保存"}</span>   
        </BlueButton>
    );
}