import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";
import EditNotificationSection from "@/components/section/notification/EditNotificationSection";
import NotFoundSection from "@/components/section/NotFoundSection";

export default async function Home(props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const tier = await getTier();

    return (
        checkTier(tier) ? <EditNotificationSection id={Number(params.id)} tier={tier} /> : <NotFoundSection />
    )
}