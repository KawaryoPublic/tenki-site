import RolesSection from "@/components/section/role/RolesSection";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";

export default async function Home() {
  const tier = await getTier();

  return (
    checkTier(tier, false, true) && <RolesSection tier={tier} />
  );
}