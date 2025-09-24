import EditObservationSection from "@/components/feature/calendar/edit_observation/EditObservationSection";
import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";


export default async function Home({ params }: { params: { day: string } }) {
    const tier = await getTier();

    return (
        checkTier(tier, false, true) && <EditObservationSection day={Number(params.day)} tier={tier} />
    )
}