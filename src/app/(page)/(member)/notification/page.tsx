import NotificationSection from "@/components/layout/member/notification/NotificationSection";
import BlueButton from "@/components/ui/global/button/BlueButton";
import RestrictedLink from "@/components/ui/global/RestrictedLink";
import RestrictedContent from "@/components/ui/global/RestrictedContent";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
          <BlueButton>
            <RestrictedContent>
              <RestrictedLink href="/notification/edit">追加</RestrictedLink>
            </RestrictedContent>
          </BlueButton>
        </div>
      </div>
      <NotificationSection />
    </div>
  );
}