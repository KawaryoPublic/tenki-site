import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";
import EditManualSection from "@/components/section/manual/EditManualSection";

export default async function Home(props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const tier = await getTier();

    return (
        checkTier(tier) && <EditManualSection id={Number(params.id)} tier={tier} />
    )
}