import AddNotificationSection from "@/components/section/notification/AddNotificationSection";
import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";

export default async function Home() {
    const tier = await getTier();

    return (
        checkTier(tier) && <AddNotificationSection />
    )
}