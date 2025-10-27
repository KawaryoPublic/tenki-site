"use client";

import { File, TIER } from "@/lib/type";
import { useState, useEffect } from "react";
import { checkTier } from "@/lib/util";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import FileUI from "@/components/ui/file/FileUI";

export default function FileSection({ tier }: { tier: TIER }) {
  const [ files, setFiles ] = useState<File[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/api/file?tier=${tier}`)
      .then(res => res.json())
      .then(data => setFiles(data))
      .finally(() => setLoading(false))
      .catch(err => console.error(err))
    }, []);

  return (
    <section className="flex-1 flex flex-col gap-3 w-full">
      {
        checkTier(tier) && 
        <div>
          <BlueButton href="/file/edit">追加</BlueButton>
        </div>
      }
      {
        loading ? <div className="text-xl">Loading...</div> :
        files.length === 0 ? 
          <div className="flex-1 flex flex-col justify-center items-center">
            ファイルはありません
          </div> : 
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