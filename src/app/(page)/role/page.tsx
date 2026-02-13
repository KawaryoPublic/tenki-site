import RolesSection from "@/components/section/role/RolesSection";
import { getTier } from "@/lib/actions";

export default async function Home() {
  const tier = await getTier();

  return (
    <RolesSection tier={tier} />
  );
}