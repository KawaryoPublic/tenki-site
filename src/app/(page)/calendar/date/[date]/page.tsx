import DateInfoDetailSection from "@/components/section/calendar/date/DateInfoDetailSection";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";

export default async function Home(props: { params: Promise<{ date: string }> }) {
    const params = await props.params;
    const tier = await getTier();
    
    return (
        checkTier(tier, false, true) && <DateInfoDetailSection date={params.date} tier={tier} />
    );
}