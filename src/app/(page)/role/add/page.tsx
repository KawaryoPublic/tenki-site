import AddRoleSection from "@/components/section/role/AddRoleSection";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";

export default async function Home() {
    const tier = await getTier();

    return (
        checkTier(tier) && <AddRoleSection  />
    );
}