"use client";

import { Equipment, Role } from "@/lib/types";
import { useState, useEffect } from "react";
import { checkTier, defaultFilter, defaultSearch } from "@/lib/utils";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import DefaultSearchForm from "@/components/ui/global/Form/DefaultSearch";
import EquipmentUI from "@/components/ui/equipment/EquipmentUI";

export default function EquipmentSection({ tier, tags, title, role }: { tier: number, tags: string[], title: string[], role?: number }) {
  const [ roles, setRoles ] = useState<Role[]>([]);
  const [ equipment, setEquipment ] = useState<Equipment[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/equipment`)
      .then(res => res.json())
      .then(data => setEquipment(defaultFilter(data, tags, title, role)))
      .then(() => {
        fetch('/api/role')
          .then(res => res.json())
          .then(data => setRoles(data))
          .finally(() => setLoading(false))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err))
    }, [tags, title, role]);

  return (
    loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
    <section className="flex-1 flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center">
        <div className="z-2">
          {
            checkTier(tier) && <BlueButton href="/equipment/add">追加</BlueButton>
          }
        </div>
        <DefaultSearchForm 
          title="検索(#をつけるとタグ)" 
          className="w-[80%] md:w-[70%] lg:w-[50%]" 
          defaultValue={`${title.join(" ")}${(title.length !== 0 && tags.length !== 0) ? " " : ""}${tags.map(tag => `#${tag}`).join(" ")}`} 
          search={(searchString, role) => defaultSearch("/equipment", searchString, role)} 
          roles={roles}
          defaultRole={role}
        />
      </div>
      {
        !equipment || !roles ? <div className="flex-1 flex flex-col items-center font-bold text-xl">機材一覧を読み込めませんでした</div> :
        equipment.length === 0 ? <div className="flex-1 flex flex-col items-center font-bold text-xl">機材はありません</div> : 
        <div className="flex flex-col gap-4">
          {
            equipment.map((equipment, index) => (
              <div key={index}>
                <EquipmentUI equipment={equipment} roles={roles} tier={tier} />
              </div>
            ))
          }
        </div>
      }
    </section>
  );
}