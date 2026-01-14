import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import LocationDetailUI from "@/components/ui/storage/LocationDetailUI";
import { LOCATIONS_LABELS } from "@/lib/const";
import { TIER } from "@/lib/types";
import Link from "next/link";

export default function LocationSection({ location, tier }: { location: string, tier: TIER }) {
    return (
        <section className="flex-1 flex flex-col gap-4 items-center">
             <WhiteFrameUI className="flex flex gap-2">
                {
                    Object.entries(LOCATIONS_LABELS).map(([value, label]) => (
                        <div>
                            <Link href={`/storage/${value}`}>{label}</Link>
                        </div>
                    ))
                }
                </WhiteFrameUI>
            <div className="w-full flex-1 flex flex gap-2">
                <div>
                    Location Map
                </div>
                <LocationDetailUI location={location} tier={tier} />
            </div>
        </section>
    )
}