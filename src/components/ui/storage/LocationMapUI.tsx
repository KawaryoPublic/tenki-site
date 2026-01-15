import WhiteFrameUI from "../global/WhiteFrameUI";

export default function LocationMapUI({ location }: { location: string }) {
    return (
        <WhiteFrameUI className="flex-1 flex items-center justify-center">
            <div className="aspect-square object-contain border-2"></div>
        </WhiteFrameUI>
    )
}