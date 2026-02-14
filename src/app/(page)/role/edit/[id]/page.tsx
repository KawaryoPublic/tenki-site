import EditRoleSection from "@/components/section/role/EditRoleSection";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";

export default async function Home(props: { params: Promise<{ id: string }>}) {
    const tier = await getTier();
    const params = await props.params;

    return (
        checkTier(tier) && <EditRoleSection id={Number(params.id)} />
    );
}