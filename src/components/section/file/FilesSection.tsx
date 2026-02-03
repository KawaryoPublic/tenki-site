"use client";

import { File } from "@/lib/types";
import { useState, useEffect } from "react";
import { checkTier, filterByTagsAndTitle, searchByTagsAndTitle } from "@/lib/utils";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import FileUI from "@/components/ui/file/FileUI";
import DefaultSearchForm from "@/components/ui/global/Form/DefaultSearch";

export default function FilesSection({ tier, tags, title }: { tier: number, tags: string[], title: string[] }) {
  const [ files, setFiles ] = useState<File[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/file`)
      .then(res => res.json())
      .then(data => setFiles(filterByTagsAndTitle(data, tags, title)))
      .finally(() => setLoading(false))
      .catch(err => console.error(err))
    }, [tags, title]);

  return (
    <section className="flex-1 flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center">
        <div>
          {
            checkTier(tier) && <BlueButton href="/file/add">追加</BlueButton>
          }
        </div>
        <DefaultSearchForm title="検索(#をつけるとタグ)" className="w-[80%] md:w-[70%] lg:w-[50%]" defaultValue={`${title.join(" ")}${(title.length !== 0 && tags.length !== 0) ? " " : ""}${tags.map(tag => `#${tag}`).join(" ")}`} search={searchString => searchByTagsAndTitle("/file", searchString)}/>
      </div>
      {
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !files ? <div className="flex-1 flex flex-col items-center font-bold text-xl">ファイル一覧を読み込めませんでした</div> :
        files.length === 0 ? <div className="flex-1 flex flex-col items-center font-bold text-xl">ファイルはありません</div> : 
        <div className="flex flex-col gap-4">
          {
            files.map((file, index) => (
              <div key={index}>
                <FileUI file={file} tier={tier} />
              </div>
            ))
          }
        </div>
      }
    </section>
  );
}