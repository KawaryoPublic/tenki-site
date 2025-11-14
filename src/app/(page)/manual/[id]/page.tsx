import ManualDetailSection from "@/components/section/manual/ManualDetailSection";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";

export default async function Home(props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const tier = await getTier();

    return (
        checkTier(tier, false, true) && <ManualDetailSection id={Number(params.id)} tier={tier} />
    )
}