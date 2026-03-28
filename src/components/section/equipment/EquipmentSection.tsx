"use client";

import { Equipment, Role } from "@/lib/types";
import { useState, useEffect } from "react";
import { checkTier, defaultFilter, getEquipmentId } from "@/lib/utils";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import DefaultSearchForm from "@/components/ui/global/Form/DefaultSearchForm";
import EquipmentUI from "@/components/ui/equipment/EquipmentUI";
import { EQUIPMENT_TYPES } from "@/lib/const";

export default function EquipmentSection({ tier, tags, title, role, type }: { tier: number, tags: string[], title: string[], role?: number, type?: number }) {
  const [ roles, setRoles ] = useState<Role[]>([]);
  const [ equipment, setEquipment ] = useState<Equipment[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/equipment`)
      .then(res => res.json())
      .then(data => {
        for(const equipment of data) {
          equipment.name = `${getEquipmentId(equipment)} ${equipment.name}`;
        }

        return data;
      })
      .then(data => setEquipment(defaultFilter(data, tags, 
        {
          label: "name",
          values: title
        },
        [
          {
            label: "roles",
            value: role,
          },
          {
            label: "type",
            value: type,
          }
        ])))
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
          url="/equipment"
          title="検索(#をつけるとタグ)" 
          text={{
            label: "title",
            defaultValue: `${[...title, ...(tags.map(tag => `#${tag}`))].join(" ")}` 
          }}
          selects={[
            {
              title: "役職",
              name: "role",
              defaultValue: role?.toString(),
              values: roles.map(role => ({ label: role.name, value: role.id }))
            },
            {
              title: "種類",
              name: "type",
              defaultValue: type?.toString(),
              values: EQUIPMENT_TYPES.map((type, i) => ({ label: type, value: i }))
            }
          ]}
          className="w-[80%] md:w-[70%] lg:w-[50%]" 
        />
      </div>
      {
        !equipment || !roles ? <div className="flex-1 flex flex-col items-center font-bold text-xl">機材一覧を読み込めませんでした</div> :
        equipment.length === 0 ? <div className="flex-1 flex flex-col items-center font-bold text-xl">機材はありません</div> : 
        <div className="flex flex-col gap-4">
          {
            Array.from(EQUIPMENT_TYPES).map((_, i) => {
              return (
                equipment.filter(e => e.type === i).map((equipment, index) => (
                  <div key={index}>
                    <EquipmentUI equipment={equipment} roles={roles} tier={tier} />
                  </div>
                ))
              )
            })
          }
        </div>
      }
    </section>
  );
}