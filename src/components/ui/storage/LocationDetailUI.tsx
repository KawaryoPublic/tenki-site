import { checkTier } from "@/lib/utils";
import BlueButton from "../global/Button/BlueButton";
import WhiteFrameUI from "../global/WhiteFrameUI";
import { Equipment, Location, TIER } from "@/lib/types";
import Link from "next/link";

export default function LocationDetailUI({ location, allEquipment, tier }: { location: Location, allEquipment: Equipment[], tier: TIER }) {
    return (  
        <WhiteFrameUI className="flex-1 flex flex-col gap-2">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl md:text-3xl font-bold">{location.name}</h2>
                <div className="flex items-center gap-2 md:gap-4">
                    {
                        checkTier(tier) && 
                        <>
                            <BlueButton href={`storage/location/edit/${location}`}>編集</BlueButton>
                        </>
                    }
                </div>
            </div>
            <div className="whitespace-pre-wrap text-sm md:text-base">
                <p className="font-bold">機材一覧</p>
                <nav>
                    {
                        allEquipment.length === 0 ? <div>この場所には機材がありません。</div> :
                        allEquipment.map((equipment, i) => (
                            <div>
                                ・
                                <Link href={`/equipment/${equipment.id}`} className="text-blue-500 underline" key={i}>
                                    {equipment.name}
                                </Link>
                            </div>
                        ))
                    }
                </nav>
            </div>
        </WhiteFrameUI>
    )
}