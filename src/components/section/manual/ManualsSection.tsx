"use client";

import { Manual, Role } from "@/lib/types";
import { useState, useEffect } from "react";
import { checkTier, defaultFilter, defaultSearch } from "@/lib/utils";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import DefaultSearchForm from "@/components/ui/global/Form/DefaultSearch";
import ManualUI from "@/components/ui/manual/ManualUI";

export default function ManualsSection({ tier, tags, title, role }: { tier: number, tags: string[], title: string[], role?: number }) {
  const [ roles, setRoles ] = useState<Role[]>([]);
  const [ manuals, setManuals ] = useState<Manual[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/manual`)
      .then(res => res.json())
      .then(data => setManuals(defaultFilter(data, tags, title, role)))
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
        <div>
          {
            checkTier(tier) && <BlueButton href="/manual/add">追加</BlueButton>
          }
        </div>
        <DefaultSearchForm 
          title="検索(#をつけるとタグ)" 
          className="w-[80%] md:w-[70%] lg:w-[50%]" 
          defaultValue={`${title.join(" ")}${(title.length !== 0 && tags.length !== 0) ? " " : ""}${tags.map(tag => `#${tag}`).join(" ")}`} 
          search={(searchString, role) => defaultSearch("/manual", searchString, role)} 
          roles={roles}
          defaultRole={role}
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