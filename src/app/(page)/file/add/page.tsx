import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";
import AddFileSection from "@/components/section/file/AddFileSection";
import NotFoundSection from "@/components/section/NotFoundSection";

export default async function Home() {
    const tier = await getTier();

    return (
        checkTier(tier) ? <AddFileSection /> : <NotFoundSection />
    )
}