import EditDateInfoSection from "@/components/section/calendar/date/EditDateInfoSection";
import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";

export default async function Home(props: { params: Promise<{ date: string }> }) {
    const params = await props.params;
    const tier = await getTier();
    
    return (
        checkTier(tier) && <EditDateInfoSection date={params.date} tier={tier} />
    );
}