import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";
import AddFileSection from "@/components/section/file/AddFileSection";

export default async function Home() {
    const tier = await getTier();

    return (
        checkTier(tier) && <AddFileSection />
    )
}