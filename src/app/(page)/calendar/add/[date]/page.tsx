import AddDateInfoSection from "@/components/section/calendar/AddDateInfoSection";
import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";

export default async function Home(props: { params: Promise<{ date: string }> }) {
    const params = await props.params;
    const tier = await getTier();

    return (
        checkTier(tier) && <AddDateInfoSection date={params.date} />
    );

}