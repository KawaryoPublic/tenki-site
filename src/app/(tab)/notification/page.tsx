import NotificationSection from "@/components/layout/notification/NotificationSection";
import DefaultLink from "@/components/ui/global/DefaultLink";
import RestrictedContent from "@/components/ui/global/RestrictedContent";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">通知ページ</h1>
        <div>
          <Suspense>
            <RestrictedContent>
              <DefaultLink href="/notification/edit">追加</DefaultLink>
            </RestrictedContent>
          </Suspense>
        </div>
      </div>
      <NotificationSection />
    </div>
  );
}