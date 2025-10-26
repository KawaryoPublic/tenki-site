import DateInfoSection from "@/components/section/calendar/DateInfoSection";
import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";

export default async function Home({ params }: { params: { date: string } }) {
    const tier = await getTier();
    return (
        checkTier(tier, false, true) && <DateInfoSection date={params.date} tier={tier} />
    );
}