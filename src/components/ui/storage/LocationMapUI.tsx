import { Location } from "@/lib/types";
import WhiteFrameUI from "../global/WhiteFrameUI";

export default function LocationMapUI({ location }: { location: Location }) {
    return (
        <WhiteFrameUI className="flex-1 flex items-center justify-center">
            <div className="flex-1 aspect-square object-contain border-2"></div>
        </WhiteFrameUI>
    )
}