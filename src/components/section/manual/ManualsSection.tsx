"use client";

import { Manual } from "@/lib/types";
import { useState, useEffect } from "react";
import { checkTier, defaultFilter, defaultSearch } from "@/lib/utils";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import DefaultSearchForm from "@/components/ui/global/Form/DefaultSearch";
import ManualUI from "@/components/ui/manual/ManualUI";

export default function ManualsSection({ tier, tags, title }: { tier: number, tags: string[], title: string[] }) {
  const [ manuals, setManuals ] = useState<Manual[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/manual`)
      .then(res => res.json())
      .then(data => setManuals(defaultFilter(data, tags, title)))
      .finally(() => setLoading(false))
      .catch(err => console.error(err))
    }, [tags, title]);

  return (
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
          search={searchString => defaultSearch("/manual", searchString)} 
          role
        />
      </div>
      {
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !manuals ? <div className="flex-1 flex flex-col items-center font-bold text-xl">マニュアル一覧を読み込めませんでした</div> :
        manuals.length === 0 ? <div className="flex-1 flex flex-col items-center font-bold text-xl">マニュアルはありません</div> : 
        <div className="flex flex-col gap-4">
          {
            manuals.map((manual, index) => (
              <div key={index}>
                <ManualUI manual={manual} tier={tier} />
              </div>
            ))
          }
        </div>
      }
    </section>
  );
}