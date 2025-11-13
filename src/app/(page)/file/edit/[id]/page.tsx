import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";
import EditFileSection from "@/components/section/file/EditFileSection";

export default async function Home(props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const tier = await getTier();

    return (
        checkTier(tier) && <EditFileSection id={Number(params.id)} />
    )
}