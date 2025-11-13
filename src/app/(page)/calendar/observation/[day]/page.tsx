import ObservationDetailSection from "@/components/section/calendar/observation/ObservationDetailSection";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";

export default async function Home(props: { params: Promise<{ day: string }> }) {
    const params = await props.params;
    const tier = await getTier();

    return (
        checkTier(tier, false, true) && <ObservationDetailSection day={Number(params.day)} tier={tier} />
    )
}