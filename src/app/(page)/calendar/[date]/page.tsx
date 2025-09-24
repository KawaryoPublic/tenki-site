import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";
import DateInfoSection from "@/components/feature/calendar/date_info/DateInfoSection";

export default async function Home({ params }: { params: { date: string } }) {
    const tier = await getTier();
    return (
        checkTier(tier, false, true) && <DateInfoSection date={params.date} tier={tier} />
    );
}