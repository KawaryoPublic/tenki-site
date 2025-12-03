import StorageSection from "@/components/section/storage/StorageSection";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";

export default async function Home({ params }: { params: { id: string }}) {
  const tier = await getTier();
  const id = Number((await params).id);
  
  return (
    checkTier(tier, false, true) && <StorageSection id={id} tier={tier} />
  )
}