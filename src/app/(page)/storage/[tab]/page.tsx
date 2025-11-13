import StorageSection from "@/components/section/storage/StorageSection";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";

export default async function Home({ params }: { params: { tab: string }}) {
  const tier = await getTier();
  const tab = Number((await params).tab);
  
  return (
    checkTier(tier, false, true) && 
    <StorageSection tab={tab} tier={tier} />
  )
}