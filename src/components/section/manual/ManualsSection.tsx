"use client";

import { Manual, Role } from "@/lib/types";
import { useState, useEffect } from "react";
import { checkTier, defaultFilter } from "@/lib/utils";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import DefaultSearchForm from "@/components/ui/global/Form/DefaultSearchForm";
import ManualUI from "@/components/ui/manual/ManualUI";

export default function ManualsSection({ tier, tags, title, role }: { tier: number, tags: string[], title: string[], role?: number }) {
  const [ roles, setRoles ] = useState<Role[]>([]);
  const [ manuals, setManuals ] = useState<Manual[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/manual`)
      .then(res => res.json())
      .then(data => setManuals(defaultFilter(data, tags, 
        {
          label: "title",
          values: title
        },
        [
          {
            label: "roles",
            value: role,
          }
        ]
      )))
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
            checkTier(tier) && <BlueButton href="/manual/add">追加</BlueButton>
          }
        </div>
        <DefaultSearchForm 
          url="/manual"
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
          ]}
          className="w-[80%] md:w-[70%] lg:w-[50%]" 
        />
      </div>
      {
        !manuals || !roles ? <div className="flex-1 flex flex-col items-center font-bold text-xl">マニュアル一覧を読み込めませんでした</div> :
        manuals.length === 0 ? <div className="flex-1 flex flex-col items-center font-bold text-xl">マニュアルはありません</div> : 
        <div className="flex flex-col gap-4">
          {
            manuals.map((manual, index) => (
              <div key={index}>
                <ManualUI manual={manual} roles={roles} tier={tier} />
              </div>
            ))
          }
        </div>
      }
    </section>
  );
}