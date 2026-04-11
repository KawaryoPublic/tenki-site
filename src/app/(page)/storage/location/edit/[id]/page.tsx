import NotFoundSection from "@/components/section/NotFoundSection";
import EditLocationSection from "@/components/section/storage/location/EditLocationSection";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";

export default async function Home({ params, searchParams }: { params: { id: string }, searchParams: { add?: string }}) {
    const tier = await getTier();
    const id = (await params).id;
    const add = (await searchParams).add === "on";

    return (
        checkTier(tier) ? <EditLocationSection id={Number(id)} add={add} /> : <NotFoundSection />
    )
}