import AddNotificationSection from "@/components/section/notification/AddNotificationSection";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";

export default async function Home() {
    const tier = await getTier();

    return (
        checkTier(tier) && <AddNotificationSection />
    )
}