import Calender from "@/components/feature/calendar/Calender";
import FilterObservationForm from "@/components/feature/calendar/FilterObservationForm";
import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";

export default async function Home({ searchParams }: { searchParams: { filter?: string } }) {
    const filter = searchParams.filter || "";
    const tier = await getTier();

    return (
        checkTier(tier, false, true) &&
        <section className="flex-1 flex flex-col lg:flex-row gap-4">
            <div>
                {
                    Array.from({ length: 3 }).map((_, i) => <Calender key={i} index={i} tier={tier} filter={filter} />)
                }
            </div>
            <div>
                <FilterObservationForm />
            </div>
        </section>
    )
}