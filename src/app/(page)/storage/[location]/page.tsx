import { getTier } from "@/lib/actions";

export default async function Home({ params }: { params: { location: string }}) {
  const tier = await getTier();
  const location = (await params).location;
  
  return (
    <div>{location}</div>
  )
}