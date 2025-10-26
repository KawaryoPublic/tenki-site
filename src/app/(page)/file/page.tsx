import FileSection from "@/components/section/file/FileSection";
import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";

export default async function Home() {
  const tier = await getTier();

  return (
    checkTier(tier) && <FileSection tier={tier} />
  );
}