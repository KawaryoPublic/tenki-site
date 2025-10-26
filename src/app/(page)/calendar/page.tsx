import CalendarSection from "@/components/section/calendar/CalendarSection";
import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";

export default async function Home({ searchParams }: { searchParams: { filter?: string } }) {
    const filter = searchParams.filter || "";
    const tier = await getTier();

    return (
        checkTier(tier, false, true) && <CalendarSection filter={filter} tier={tier} />
    )
}