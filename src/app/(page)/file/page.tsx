import FilesSection from "@/components/section/file/FilesSection";
import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";

export default async function Home() {
  const tier = await getTier();

  return (
    checkTier(tier) && <FilesSection tier={tier} />
  );
}