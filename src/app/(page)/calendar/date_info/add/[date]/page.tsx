import AddDateInfoSection from "@/components/section/calendar/date_info/AddDateInfoSection";
import NotFoundSection from "@/components/section/NotFoundSection";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";

export default async function Home(props: { params: Promise<{ date: string }> }) {
    const params = await props.params;
    const tier = await getTier();

    return (
        checkTier(tier) ? <AddDateInfoSection date={params.date} /> : <NotFoundSection />
    );

}