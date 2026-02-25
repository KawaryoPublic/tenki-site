import NotificationsSection from "@/components/section/notification/NotificationsSection";
import { getTier } from "@/lib/actions";

export default async function Home(props: { searchParams: Promise<{ tags?: string, title?: string, role?: string, important?: string }> }) {
  const searchParams = await props.searchParams;
  const tags = searchParams.tags ? searchParams.tags.split(",") : [];
  const title = searchParams.title ? searchParams.title.split(",") : [];
  const role = searchParams.role;
  const important = searchParams.important === "y";
  const tier = await getTier();

  return (
    <NotificationsSection tier={tier} tags={tags} title={title} role={role == null ? undefined : Number(role)} important={important} />
  );
}