import { splitLinksAndHeaders } from "@/lib/utils";
import WhiteFrameUI from "../global/WhiteFrameUI";
import { Manual, Role } from "@/lib/types";
import DeleteManualButton from "./Button/DeleteManualButton";
import OptionUrlUI from "../global/OptionUrlUI";
import Link from "next/link";
import DefaultDetailTitleUI from "../global/DefaultDetailTitleUI";
import DefaultHeadingUI from "../global/DefaultHeadingUI";

export default function ManualDetailUI({ manual, roles, tier }: { manual: Manual, roles: Role[], tier: number }) {
    return (
        <WhiteFrameUI className="flex flex-col gap-2">
            <DefaultDetailTitleUI tier={tier} editLink={`/manual/edit/${manual.id}`} deleteButton={<DeleteManualButton id={manual.id} urls={manual.urls} />} updatedAt={new Date(manual.updatedAt)} roles={roles} tags={manual.tags} className="border-b pb-2">
                <DefaultHeadingUI>{manual.title}</DefaultHeadingUI>
            </DefaultDetailTitleUI>
            <div className="whitespace-pre-wrap text-sm md:text-base">
                {
                    splitLinksAndHeaders(manual.content).map((part, index) => (
                        part.type === "link" ? 
                            <Link key={index} href={part.content} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{part.content}</Link> :
                            part.type === "header" ?
                                <h3 key={index} className="text-lg md:text-xl font-bold mb-1">{part.content}</h3> :
                                <span key={index}>{part.content}</span>
                    ))
                }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-sm md:text-base">
                {
                    manual.urls.map((url, index) => (
                        <OptionUrlUI key={index} url={url} label={manual.filenames[index]} className="py-2" />
                    ))
                }
            </div>
        </WhiteFrameUI>
    )
}