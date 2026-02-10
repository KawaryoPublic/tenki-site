"use client";

import { useState, useEffect } from "react";
import { checkTier } from "@/lib/utils";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import { ROLE_LABELS } from "@/lib/const";
import RoleUI from "@/components/ui/role/RoleUI";

export default function RolesSection({ tier }: { tier: number }) {
  const [ roles, setRoles ] = useState<string[]>(ROLE_LABELS);
  const [ loading, setLoading ] = useState<boolean>(false);

  return (
    <section className="flex-1 flex flex-col gap-3 w-full">
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
                <RoleUI role={role} tier={tier} />
              </div>
            ))
          }
        </div>
      }
    </section>
  );
}