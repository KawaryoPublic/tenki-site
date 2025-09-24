import NotificationSection from "@/components/feature/notification/NotificationSection";
import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";

export default async function Home() {
  const tier = await getTier();

  return (
    checkTier(tier, true, true) && <NotificationSection tier={tier} />
  );
}