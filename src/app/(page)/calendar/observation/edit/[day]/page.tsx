import EditObservationSection from "@/components/section/calendar/observation/EditObservationSection";
import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";

export default async function Home(props: { params: Promise<{ day: string }> }) {
    const params = await props.params;
    const tier = await getTier();

    return (
        checkTier(tier) && <EditObservationSection day={Number(params.day)} tier={tier} />
    )
}