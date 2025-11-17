import { checkTier, splitLinks } from "@/lib/utils";
import BlueButton from "../global/Button/BlueButton";
import WhiteFrameUI from "../global/WhiteFrameUI";
import { Manual, TIER } from "@/lib/types";
import DeleteManualButton from "./Button/DeleteManualButton";
import FileLinkUI from "../global/FileLinkUI";
import Link from "next/link";

export default function ManualDetailUI({ manual, tier }: { manual: Manual, tier: TIER }) {
    return (
        <WhiteFrameUI className="flex flex-col gap-2">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl md:text-3xl font-bold">{manual.title}</h2>
                <div className="flex items-center gap-2 md:gap-4">
                    {
                        checkTier(tier) && 
                        <>
                            <BlueButton href={`/manual/edit/${manual.id}`}>編集</BlueButton>
                            <DeleteManualButton id={manual.id}  urls={manual.urls} />
                        </>
                    }
                </div>
            </div>
            <div className="whitespace-pre-wrap text-sm md:text-base">
                {
                    splitLinks(manual.content).map((part, index) => (
                        part.type === "text" ? 
                            <span key={index}>{part.content}</span> :
                            <Link key={index} href={part.content} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{part.content}</Link>
                    ))
                }
                        </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-sm md:text-base">
                {
                    manual.urls.map((url, index) => (
                        <FileLinkUI key={index} url={url} filename={manual.filenames[index]} className="py-2" />
                    ))
                }
            </div>
        </WhiteFrameUI>
    )
}