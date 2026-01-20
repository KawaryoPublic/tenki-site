import { Location } from "@/lib/types";
import WhiteFrameUI from "../global/WhiteFrameUI";

export default function LocationMapUI({ location }: { location: Location }) {
    return (
        <WhiteFrameUI className="flex-1 flex flex-col gap-6">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl md:text-2xl font-bold">{location.name}の地図</h2>
            </div>
            <div className={`flex-1 object-contain border-2`} style={{ aspectRatio: location.size[0] / location.size[1]}}></div>
        </WhiteFrameUI>
    )
}