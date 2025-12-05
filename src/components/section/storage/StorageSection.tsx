"use client";

import { useState, useEffect } from "react";
import { Storage, TIER } from "@/lib/types";
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
    <section className="flex-1 flex flex-col gap-2 w-full">
      {
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !storages ? <div className="flex-1 flex flex-col items-center font-bold text-xl">倉庫を読み込めませんでした</div> : 
        <>
          <WhiteFrameUI>
            <nav className="flex justify-around">
              {
                storages.map((storage, index) => (
                  <Link href={`/storage/${storage.id}`} className={`hover:bg-gray-400 ${storage.id === id ? "border-b-3 font-bold" : ""}`}>{storage.name}</Link>
                ))
              }
            </nav>
          </WhiteFrameUI>
          <div className="flex-1 flex gap-4">
            <div className="flex-2 flex flex-col gap-2">
              <div className="flex-1">
                <Image src={storage!.url} alt={storage!.name} className="w-full h-full object-contain" />
              </div>
              <div>
                Form here.
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <ul>
                {
                  storage!.locations.map((location, index) => (
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
          </div>
          
        </>
      }
    </section>
  );
}