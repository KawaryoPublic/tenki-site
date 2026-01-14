import { TIER } from "@/lib/types";

export default function LocationSection({ location, tier }: { location: string, tier: TIER }) {
    return (
        <section className="flex flex-col gap-4">
            <div>
                <nav>
                    Change location
                </nav>
            </div>
            <div className="flex flex gap-2">
                <div>
                    Location Map
                </div>
                <div>
                    Location Detail
                </div>
            </div>
        </section>
    )
}