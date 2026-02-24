"use client";

import NotificationUI from "@/components/ui/notification/NotificationUI";
import { Notification, Role } from "@/lib/types";
import { useState, useEffect } from "react";
import { checkTier, defaultFilter, defaultSearch } from "@/lib/utils";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import DefaultSearchForm from "@/components/ui/global/Form/DefaultSearch";

export default function NotificationsSection({ tier, tags, title, role }: { tier: number, tags: string[], title: string[], role?: number }) {
  const [ roles, setRoles ] = useState<Role[]>([]);
  const [ notifications, setNotifications ] = useState<Notification[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/notification`)
      .then(res => res.json())
      .then(data => setNotifications(defaultFilter(data, tags, title, role)))
      .then(() => {
        fetch('/api/role')
          .then(res => res.json())
          .then(data => setRoles(data))
          .finally(() => setLoading(false))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
    }, [tags, title, role]);

  return (
    loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
    <section className="flex-1 flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center">
        <div className="z-2">
          {
            checkTier(tier) && <BlueButton href="/notification/add">追加</BlueButton>
          }
        </div>
        <DefaultSearchForm 
          title="検索(#をつけるとタグ)" 
          className="w-[80%] md:w-[70%] lg:w-[50%]" 
          defaultValue={`${title.join(" ")}${(title.length !== 0 && tags.length !== 0) ? " " : ""}${tags.map(tag => `#${tag}`).join(" ")}`} 
          search={(searchString, role) => defaultSearch("/notification", searchString, role)} 
          roles={roles}
          defaultRole={role}
        />
      </div>
      {
        !notifications  || !roles ? <div className="flex-1 flex flex-col items-center font-bold text-xl">告知一覧を読み込めませんでした</div> :
        notifications.length === 0 ? <div className="flex-1 flex flex-col items-center font-bold text-xl">告知はありません</div> : 
        <div className="flex flex-col gap-4">
          {
            notifications.map((notification, index) => (
              <div key={index}>
                <NotificationUI notification={notification} roles={roles} tier={tier} />
              </div>
            ))
          }
        </div>
      }
    </section>
  );
}