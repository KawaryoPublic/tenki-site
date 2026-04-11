import AddEquipmentSection from "@/components/section/equipment/AddEquipmentSection";
import NotFoundSection from "@/components/section/NotFoundSection";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";

export default async function Home() {
    const tier = await getTier();

    return (
        checkTier(tier) ? <AddEquipmentSection /> : <NotFoundSection />
    )
}