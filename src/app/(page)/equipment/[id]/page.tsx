
import EquipmentDetailSection from "@/components/section/equipment/EquipmentDetailSection";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";

export default async function Home(props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const tier = await getTier();

    return (
        checkTier(tier, false, true) && <EquipmentDetailSection id={Number(params.id)} tier={tier} />
    )
}