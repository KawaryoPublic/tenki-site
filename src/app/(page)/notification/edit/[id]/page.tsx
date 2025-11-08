import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";
import EditNotificationSection from "@/components/section/notification/EditNotificationSection";

export default async function Home(props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const tier = await getTier();

    return (
        checkTier(tier, true, true) && <EditNotificationSection id={Number(params.id)} />
    )
}