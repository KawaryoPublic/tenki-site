"use client";

import { useState, useEffect } from "react";
import { Storage, TIER } from "@/lib/types";
import { checkTier } from "@/lib/utils";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import Link from "next/link";
import Image from "next/image";

export default function StorageSection({ id, tier }: { id: number, tier: TIER }) {
  const [ storages, setStorages ] = useState<Storage[]>([]);
  const [ storage, setStorage ] = useState<Storage | null>(null);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    setLoading(true);
  
    fetch("/api/storage")
      .then(res => res.json())
      .then(data => {
        setStorages(data);
        setStorage(data.find((storage: Storage) => storage.id === id));
      })
      .finally(() => setLoading(false))
      .catch(err => console.log(err));
    }, [id]);

  return (
    <section className="flex-1 flex flex-row gap-4 w-full">
      {
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !storages ? <div className="flex-1 flex flex-col items-center font-bold text-xl">倉庫一覧を読み込めませんでした</div> : 
        <>
          <div className="flex flex-col h-full gap-4">
            <WhiteFrameUI>
              {
                storages.map((storage, index) => (
                  <nav className="flex justify-around">
                    <Link href={`/storage/${storage.id}`} className={`text-lg hover:bg-gray-400 ${storage.id === id ? "border-b-3 font-bold" : ""}`}>{storage.name}</Link>
                  </nav>
                ))
              }
            </WhiteFrameUI>
            <div className="flex-1">
              <Image src={storage!.url} alt={storage!.name} className="w-full h-full object-contain" />
            </div>
            <div>
              Form here.
            </div>
          </div>
          <div>
            <ul>
              {
                storage.locations.map((location, index) => (
                  <li key={index}>
                    <Link href={`/storage/location/${location}`}>・{location}</Link>
                  </li>
                ))
              }
            </ul>
            <div>
              Button here.
            </div>
          </div>
        </>
      }
    </section>
  );
}