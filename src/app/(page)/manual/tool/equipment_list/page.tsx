import EquipmentListSection from "@/components/section/manual/tool/EquipmentListSection";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";

export default async function Home() {
    const tier = await getTier();

    return (
        checkTier(tier, false, true) && <EquipmentListSection />
    );
}