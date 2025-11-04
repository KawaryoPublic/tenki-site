import NotificationsSection from "@/components/section/notification/NotificationsSection";
import { getTier } from "@/lib/action";

export default async function Home() {
  const tier = await getTier();

  return (
    <NotificationsSection tier={tier} />
  );
}