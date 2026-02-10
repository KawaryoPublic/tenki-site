"use client";

import { useState, useEffect } from "react";
import { checkTier } from "@/lib/utils";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import Link from "next/link";
import Image from "next/image";
import { Role } from "@/lib/types";

export default function RolesSection({ tier }: { tier: number }) {
  const roles = [
    {
      id: "1",
      name: "部長",
      description: "説明",
    }
  ];
  const [ loading, setLoading ] = useState<boolean>(false);

  return (
    <section className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div>
          {
            checkTier(tier) && <BlueButton href="/manual/add">追加</BlueButton>
          }
        </div>
      </div>
      {
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !roles ? <div className="flex-1 flex flex-col items-center font-bold text-xl">役職一覧を読み込めませんでした</div> :
        roles.length === 0 ? <div className="flex-1 flex flex-col items-center font-bold text-xl">役職はありません</div> : 
        <div className="flex flex-col gap-4">
          {
            roles.map((role, index) => (
              <div key={index}>
                <Link href={`role/${role.id}`} className="relative flex aspect-square">
                  <Image src="/image/role_test.png" alt="Role Icon" fill />
                </Link>
              </div>
            ))
          }
        </div>
      }
    </section>
  );
}