"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Box, TIER } from "@/lib/type";
import { checkTier } from "@/lib/util";
import WhiteFrame from "@/components/ui/WhiteFrame";
import BoxElement from "@/components/feature/storage/BoxElement";
import BoxDetail from "@/components/feature/storage/BoxDetail";
import AddBoxButton from "@/components/feature/storage/AddBoxButton";
import Link from "next/link";

export default function StorageSection({ tab, tier }: { tab: number, tier: TIER }) {
  const searchParams = useSearchParams();
  const box = searchParams.get("box");
  const [updateBox, setUpdateBox] = useState<Box>({id: -1, name: "", content: "", imageLink: "", tab: 0, width: 0, height: 0, top: 0, left: 0});
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
  
    fetch("/api/box")
      .then(res => res.json())
      .then(data => {
        setBoxes(data.map((b: Box) => b.tab === Number(tab) ? b : []));
  
        if(!box) {
          setUpdateBox({id: -1, name: "", content: "", imageLink: "", tab: 0, width: 0, height: 0, top: 0, left: 0});
          setLoading(false);

          return;
        }
  
        const temp = data.find((b: Box) => b.id === Number(box));
  
        if (temp) setUpdateBox(temp);
  
        setLoading(false);
      })
      .catch(err => console.log(err));
    }, [searchParams]);

  return (
    checkTier(tier) &&
    loading ? <div className="text-xl">Loading...</div> :
    <section className="flex flex-col md:flex-row md:justify-center gap-4 md:w-full h-full pb-5">
      <div className="flex flex-col h-full gap-4">
        <WhiteFrame>
          <nav className="flex justify-around">
            <Link href="/storage/0" className={`text-lg hover:bg-gray-400 ${tab === 0 ? "border-b-3 font-bold" : ""}`}>倉庫</Link>
            <Link href="/storage/1" className={`text-lg hover:bg-gray-400 ${tab === 1 ? "border-b-3 font-bold" : ""}`}>部室</Link>
            <Link href="/storage/2" className={`text-lg hover:bg-gray-400 ${tab === 2 ? "border-b-3 font-bold" : ""}`}>地学</Link>
          </nav>
        </WhiteFrame>
        <WhiteFrame className="h-[90%]">
          <div className="border aspect-[1/2] relative h-full">
            {
              box ? 
                <BoxElement tab={tab} box={updateBox} /> : ""
            }
            {
              boxes.map((box, index) => {
                return box.id === updateBox.id ? "" : <BoxElement key={index} tab={tab} box={box} />
              })
            }
          </div>
        </WhiteFrame>
      </div>
      {
        box ?
        <div className="lg:min-w-[40%] lg:w-[40%]">
          <BoxDetail updateBox={updateBox} setUpdateBox={setUpdateBox} tier={tier} />
        </div> : 
        checkTier(tier) &&
        <div className="flex justify-center items-center">
          <div>
            <AddBoxButton tab={tab} />
          </div>
        </div>
      }
    </section>
  );
}