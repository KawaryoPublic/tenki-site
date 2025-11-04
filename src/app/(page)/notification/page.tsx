import NotificationsSection from "@/components/section/notification/NotificationsSection";
import { getTier } from "@/lib/action";

export default async function Home(props: { searchParams: Promise<{ tags?: string, title?: string }> }) {
  const searchParams = await props.searchParams;
  const tags = searchParams.tags ? searchParams.tags.split(",") : [];
  const title = searchParams.title || "";
  const tier = await getTier();

  return (
    <NotificationsSection tier={tier} tags={tags} title={title} />
  );
}