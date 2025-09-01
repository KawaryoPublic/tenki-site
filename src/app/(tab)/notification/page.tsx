import NotificationSection from "@/components/layout/notification/NotificationSection";
import AddNotificationButton from "@/components/ui/notification/AddNotificationButton";

export default function Home() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">通知ページ</h1>
        <AddNotificationButton />
      </div>
      <NotificationSection />
    </div>
  );
}