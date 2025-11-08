import NotificationDetailSection from "@/components/section/notification/NotificationDetailSection";

export default async function Home(props: { params: Promise<{ id: string }>}) {
    const params = await props.params;

    return (
        <NotificationDetailSection id={Number(params.id)} />
    )
}