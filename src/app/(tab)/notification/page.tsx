import NotificationSection from "@/components/layout/notification/NotificationSection";
import BlueButton from "@/components/ui/global/button/BlueButton";
import DefaultLink from "@/components/ui/global/DefaultLink";
import RestrictedContent from "@/components/ui/global/RestrictedContent";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
          <BlueButton>
            <Suspense>
              <RestrictedContent>
                <DefaultLink href="/notification/edit">追加</DefaultLink>
              </RestrictedContent>
            </Suspense>
          </BlueButton>
        </div>
      </div>
      <NotificationSection />
    </div>
  );
}