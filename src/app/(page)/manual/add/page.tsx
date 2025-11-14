import AddManualSection from "@/components/section/manual/AddManualSection";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";

export default async function Home() {
    const tier = await getTier();

    return (
        checkTier(tier) && <AddManualSection />
    )
}