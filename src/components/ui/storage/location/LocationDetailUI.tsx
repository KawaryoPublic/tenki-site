import { checkTier } from "@/lib/utils";
import BlueButton from "../../global/Button/BlueButton";
import WhiteFrameUI from "../../global/WhiteFrameUI";
import { Location } from "@/lib/types";
import Link from "next/link";

export default function LocationDetailUI({ location, tier }: { location: Location, tier: number }) {
    return (  
        <WhiteFrameUI className="flex-1 flex flex-col gap-2">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl md:text-2xl font-bold">{location.name}</h2>
                <div className="flex items-center gap-2 md:gap-4">
                    {
                        checkTier(tier) && 
                        <>
                            <BlueButton href={`/storage/location/edit/${location.id}`}>編集</BlueButton>
                        </>
                    }
                </div>
            </div>
            <div className="whitespace-pre-wrap text-sm md:text-base">
                <p className="font-bold">大きさ</p>
                <span>{location.size[0]}cm × {location.size[1]}cm</span>
            </div>
            <div>
                <p className="font-bold">場所一覧</p>
                <nav className="list-disc list-inside">
                    {
                        location.shelves.map((shelf, i) => (
                            <div className="whitespace-pre-wrap" key={i}>
                                ・<Link href={`/storage/shelf/${shelf.id}`} className="text-blue-500 hover:underline">{shelf.name}</Link>
                            </div>
                        ))
                    }
                </nav>   
            </div>
        </WhiteFrameUI>
    )
}