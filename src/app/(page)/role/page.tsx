import RolesSection from "@/components/section/role/RolesSection";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";

export default async function Home(props: { searchParams: Promise<{ tags?: string, title?: string }> }) {
  const searchParams = await props.searchParams;
  const tags = searchParams.tags ? searchParams.tags.split(",") : [];
  const title = searchParams.title ? searchParams.title.split(",") : [];
  const tier = await getTier();

  return (
    checkTier(tier, false, true) && <RolesSection tier={tier} />
  );
}