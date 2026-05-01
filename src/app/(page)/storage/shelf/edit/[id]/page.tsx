import NotFoundSection from "@/components/section/NotFoundSection";
import EditShelfSection from "@/components/section/storage/shelf/EditShelfSection";
import { getTier } from "@/lib/actions";
import { checkTier } from "@/lib/utils";

export default async function Home({ params, searchParams }: { params: { id: string }, searchParams: { height: string } }) {
    const tier = await getTier();
    const id = (await params).id;
    const height = (await searchParams).height;

    return (
        checkTier(tier, false, true) ? <EditShelfSection id={Number(id)} height={Number(height)} /> : <NotFoundSection />
    );
}