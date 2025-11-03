import ObservationSection from "@/components/section/calendar/ObservationSection";
import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";


export default async function Home(props: { params: Promise<{ day: string }> }) {
    const params = await props.params;
    const tier = await getTier();

    return (
        checkTier(tier, false, true) && <ObservationSection day={Number(params.day)} tier={tier} />
    )
}