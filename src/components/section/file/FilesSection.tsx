"use client";

import { File, Role } from "@/lib/types";
import { useState, useEffect } from "react";
import { checkTier, defaultFilter } from "@/lib/utils";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import FileUI from "@/components/ui/file/FileUI";
import DefaultSearchForm from "@/components/ui/global/Form/DefaultSearchForm";
import LoadingResultUI from "@/components/ui/global/LoadingResultUI";

export default function FilesSection({ tier, tags, title, role }: { tier: number, tags: string[], title: string[], role?: number }) {
  const [ roles, setRoles ] = useState<Role[]>([]);
  const [ files, setFiles ] = useState<File[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/file`)
      .then(res => res.json())
      .then(data => setFiles(defaultFilter(data, tags, 
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
    loading ? <LoadingResultUI>Loading...</LoadingResultUI> :
    <section className="flex-1 flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center">
        <div className="z-2">
          {
            checkTier(tier) && <BlueButton href="/file/add">追加</BlueButton>
          }
        </div>
        <DefaultSearchForm 
          url="/file"
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
              values: roles.map(role => ({ label: role.name, value: role.id.toString() }))
            },
          ]}
          className="w-[80%] md:w-[70%] lg:w-[50%]" 
        />
      </div>
      {
        !files || !roles ? <LoadingResultUI>ファイル一覧を読み込めませんでした</LoadingResultUI> :
        files.length === 0 ? <LoadingResultUI>ファイルはありません</LoadingResultUI> : 
        <div className="flex flex-col gap-4">
          {
            files.map((file, index) => (
              <div key={index}>
                <FileUI file={file} roles={roles} tier={tier} />
              </div>
            ))
          }
        </div>
      }
    </section>
  );
}