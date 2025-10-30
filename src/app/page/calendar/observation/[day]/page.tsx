import ObservationSection from "@/components/section/calendar/ObservationSection";
import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";


export default async function Home({ params }: { params: { day: string } }) {
    const tier = await getTier();

    return (
        checkTier(tier, false, true) && <ObservationSection day={Number(params.day)} tier={tier} />
    )
}