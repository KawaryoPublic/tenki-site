import CalendarSection from "@/components/section/calendar/CalendarSection";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";

export default async function Home(props: { searchParams: Promise<{ filter?: string }> }) {
    const searchParams = await props.searchParams;
    const filter = searchParams.filter || "";
    const tier = await getTier();

    return (
        checkTier(tier, false, true) && <CalendarSection filter={filter} tier={tier} />
    )
}