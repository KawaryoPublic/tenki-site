"use client";

import { useState, useEffect } from "react";
import { checkTier } from "@/lib/utils";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import Link from "next/link";
import Image from "next/image";
import { Role } from "@/lib/types";

export default function RolesSection({ tier }: { tier: number }) {
  const [ roles, setRoles ] = useState<Role[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    fetch('/api/role')
      .then(res => res.json())
      .then(data => setRoles(data))
      .finally(() => setLoading(false))
      .catch(err => console.log(err));
  }, []);

  return (
    <section className="w-full flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div>
          {
            checkTier(tier) && <BlueButton href="/role/add">追加</BlueButton>
          }
        </div>
      </div>
      {
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !roles ? <div className="flex-1 flex flex-col items-center font-bold text-xl">役職一覧を読み込めませんでした</div> :
        roles.length === 0 ? <div className="flex-1 flex flex-col items-center font-bold text-xl">役職はありません</div> : 
        <div className="w-full h-full grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 md:gap-12 lg:gap-16">
          {
            roles.map((role, index) => (
              <div key={index} className="w-full aspect-square">
                <Link href={`role/${role.id}`} className="w-full h-full relative flex">
                  <Image src={role.markUrl} alt="Role Icon" priority fill sizes="flex-1" />
                </Link>
              </div>
            ))
          }
        </div>
      }
    </section>
  );
}