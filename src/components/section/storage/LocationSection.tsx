import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import LocationDetailUI from "@/components/ui/storage/LocationDetailUI";
import { LOCATIONS_LABELS } from "@/lib/const";
import { TIER } from "@/lib/types";
import Link from "next/link";

export default function LocationSection({ location, tier }: { location: string, tier: TIER }) {
    return (
        <section className="flex-1 flex flex-col gap-4 items-center">
            <div>
                <nav className="flex flex gap-2">
                    {
                        Object.entries(LOCATIONS_LABELS).map(([value, label]) => (
                            <WhiteFrameUI>
                                <Link href={`/storage/${value}`}>{label}</Link>
                            </WhiteFrameUI>
                        ))
                    }
                </nav>
            </div>
            <div className="w-full flex-1 flex flex gap-2">
                <div>
                    Location Map
                </div>
                <LocationDetailUI location={location} tier={tier} />
            </div>
        </section>
    )
}