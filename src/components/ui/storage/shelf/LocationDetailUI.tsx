import { checkTier } from "@/lib/utils";
import BlueButton from "../../global/Button/BlueButton";
import WhiteFrameUI from "../../global/WhiteFrameUI";
import { Shelf } from "@/lib/types";
import Link from "next/link";

export default function ShelfDetailUI({ shelf, tier }: { shelf: Shelf, tier: number }) {
    return (  
        <WhiteFrameUI className="flex-1 flex flex-col gap-2">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl md:text-2xl font-bold">{shelf.name}</h2>
                <div className="flex items-center gap-2 md:gap-4">
                    {
                        checkTier(tier) && 
                        <>
                            <BlueButton href={`/storage/shelf/edit/${shelf.id}`}>編集</BlueButton>
                        </>
                    }
                </div>
            </div>
            <div className="whitespace-pre-wrap text-sm md:text-base">
                <p className="font-bold">大きさ</p>
                <span>{shelf.size[0]}cm × {shelf.size[1]}cm</span>
            </div>
            <div>
                <p className="font-bold">機材一覧</p>
                <nav className="list-disc list-inside">
                    {
                        shelf.equipment.map((equipment, i) => (
                            <div className="whitespace-pre-wrap" key={i}>
                                ・<Link href={`/equipment/${equipment.id}`} className="text-blue-500 hover:underline">{equipment.name}</Link>
                            </div>
                        ))
                    }
                </nav>   
            </div>
        </WhiteFrameUI>
    )
}