"use client";

import BlueButton from "@/components/ui/Button/BlueButton";
import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";
import Link from "next/link";
import Notification from "@/components/feature/notification/Notification";
import { NotificationType } from "@/lib/type";
import { useState, useEffect } from "react";

export default async function Home() {
  const tier = await getTier();
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
    <section className="flex-1 flex flex-col min-h-[50%] w-full">
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
        notifications.map((notification, index) => (
          <div key={index} className="mb-4">
            <Notification notification={notification} tier={tier} />
          </div>
        ))
      }
    </section>
  );
}