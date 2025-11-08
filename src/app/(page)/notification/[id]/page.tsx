import NotificationDetailSection from "@/components/section/notification/NotificationDetailSection";
import { getTier } from "@/lib/action";

export default async function Home(props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const tier = await getTier();

    return (
        <NotificationDetailSection id={Number(params.id)} tier={tier} />
    )
}