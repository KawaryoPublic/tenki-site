import FilesSection from "@/components/section/file/FilesSection";
import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";

export default async function Home(props: { searchParams: Promise<{ tags?: string, title?: string }> }) {
  const searchParams = await props.searchParams;
  const tags = searchParams.tags ? searchParams.tags.split(",") : [];
  const title = searchParams.title ? searchParams.title.split(",") : [];
  const tier = await getTier();

  return (
    checkTier(tier, false, true) && <FilesSection tier={tier} tags={tags} title={title} />
  );
}