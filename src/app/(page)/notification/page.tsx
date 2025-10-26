import NotificationSection from "@/components/section/notification/NotificationSection";
import { getTier } from "@/lib/action";

export default async function Home() {
  const tier = await getTier();

  return (
    <NotificationSection tier={tier} />
  );
}