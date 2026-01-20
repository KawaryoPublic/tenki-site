import LocationSection from "@/components/section/location/LocationSection";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";

export default async function Home({ params }: { params: { id: string }}) {
  const tier = await getTier();
  const id = (await params).id;
  
  return (
    checkTier(tier) && <LocationSection id={Number(id)} tier={tier} />
  )
}