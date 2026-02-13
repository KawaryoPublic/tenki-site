import RoleDetailSection from "@/components/section/role/RoleDetailSection";
import { getTier } from "@/lib/actions";

export default async function Home(props: { params: Promise<{ id: string }>}) {
  const tier = await getTier();
  const params = await props.params;

  return (
    <RoleDetailSection id={Number(params.id)} tier={tier} />
  )
}