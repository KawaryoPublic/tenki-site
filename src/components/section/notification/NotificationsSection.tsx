"use client";

import NotificationUI from "@/components/ui/notification/NotificationUI";
import { Notification, TIER } from "@/lib/type";
import { useState, useEffect } from "react";
import { checkTier } from "@/lib/util";
import BlueButton from "@/components/ui/global/Button/BlueButton";

export default function NotificationsSection({ tier }: { tier: TIER }) {
  const [ notifications, setNotifications ] = useState<Notification[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/api/notification?tier=${tier}`)
      .then(res => res.json())
      .then(data => setNotifications(data))
      .finally(() => setLoading(false))
      .catch(err => console.error(err))
    }, []);

  return (
    <section className="flex-1 flex flex-col gap-3 w-full">
      {
        checkTier(tier) && 
        <div>
          <BlueButton href="/notification/add">追加</BlueButton>
        </div>
      }
      {
        loading ? <div className="text-xl flex-1 flex flex-col justify-center items-center">Loading...</div> :
        !notifications ? <div className="flex-1 flex flex-col justify-center items-center">通知を読み込めませんでした</div> :
        notifications.length === 0 ? <div className="flex-1 flex flex-col justify-center items-center">通知はありません</div> : 
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