import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";

export default async function Home({ params }: { params: { location: string }}) {
  const tier = await getTier();
  const location = (await params).location;
  
  return (
    <div>{location}</div>
  )
}