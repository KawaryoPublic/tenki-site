"use client";

import BlueButton from "@/components/ui/Button/BlueButton";
import { checkTier } from "@/lib/util";
import Link from "next/link";
import Notification from "@/components/feature/notification/Notification";
import { NotificationType, TIER } from "@/lib/type";
import { useState, useEffect } from "react";

export default function NotificationSection({ tier }: { tier: TIER }) {
  const [ notifications, setNotifications ] = useState<NotificationType[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/notifications")
      .then(res => res.json())
      .then(data => setNotifications(data))
      .finally(() => setLoading(false))
      .catch(err => console.error(err))
    }, []);

  return (
    checkTier(tier) &&
    <section className="flex-1 flex flex-col gap-3 w-full">
      <div className="w-full">
        <BlueButton>
          <Link href="/notification/edit">追加</Link>
        </BlueButton>
      </div>
      {
        loading ? <div className="text-xl">Loading...</div> :
        notifications.length === 0 ? (
          <div className="flex-1 flex flex-col justify-center items-center">
            通知はありません
          </div>
        ) : 
        <div className="flex flex-col gap-4">
          {
            notifications.map((notification, index) => (
              <div key={index}>
                <Notification notification={notification} tier={tier} />
              </div>
            ))
          }
        </div>
      }
    </section>
  );
}