import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";
import AddFileSection from "@/components/section/file/AddFileSection";

export default async function Home() {
    const tier = await getTier();

    return (
        checkTier(tier) && <AddFileSection />
    )
}