"use client";

import NotificationUI from "@/components/ui/notification/NotificationUI";
import { Notification, TIER } from "@/lib/type";
import { useState, useEffect } from "react";
import { checkTier, filterByTagsAndTitle, searchByTagsAndTitle } from "@/lib/util";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import DefaultSearchForm from "@/components/ui/global/Form/DefaultSearch";

export default function NotificationsSection({ tier, tags, title }: { tier: TIER, tags: string[], title: string[] }) {
  const [ notifications, setNotifications ] = useState<Notification[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/notification`)
      .then(res => res.json())
      .then(data => setNotifications(filterByTagsAndTitle(data, tags, title)))
      .finally(() => setLoading(false))
      .catch(err => console.error(err))
    }, [tags, title]);

  return (
    <section className="flex-1 flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center">
        {
          checkTier(tier) && 
          <div>
            <BlueButton href="/notification/add">追加</BlueButton>
          </div>
        }
        <DefaultSearchForm title="検索(#をつけるとタグ)" defaultValue={`${title.join(" ")}${(title.length !== 0 && tags.length !== 0) ? " " : ""}${tags.map(tag => `#${tag}`).join(" ")}`} search={searchString => searchByTagsAndTitle("/notification", searchString)} />
      </div>
      {
        loading ? <div className="flex-1 flex flex-col items-center font-bold text-xl">Loading...</div> :
        !notifications ? <div className="flex-1 flex flex-col items-center font-bold text-xl">通知を読み込めませんでした</div> :
        notifications.length === 0 ? <div className="flex-1 flex flex-col items-center font-bold text-xl">通知はありません</div> : 
        <div className="flex flex-col gap-4">
          {
            notifications.map((notification, index) => (
              <div key={index}>
                <NotificationUI notification={notification} tier={tier} />
              </div>
            ))
          }
        </div>
      }
    </section>
  );
}