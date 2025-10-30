import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { checkTier } from "@/lib/util";
import { File, TIER } from "@/lib/type";
import Link from "next/link";
import BlueButton from "../global/Button/BlueButton";
import DeleteFileButton from "./Button/DeleteFileButton";

export default function FileUI({ file, tier }: { file: File, tier: TIER }) {
    const updatedAt = new Date(file.updatedAt);

    return (
        <WhiteFrameUI>
            <div className="flex justify-between items-center mb-2 border-b pb-2">
                <Link className="text-xl lg:text-3xl font-bold" href={file.url}>{file.title}</Link>
                <div className="flex items-center gap-4">
                    <span className="text-gray-800 text-xs lg:text-sm">{`${updatedAt.getFullYear() === (new Date()).getFullYear() ? "" : `${updatedAt.getFullYear()}年`}${updatedAt.getMonth() + 1}月${updatedAt.getDate()}日`}</span>
                    {
                        checkTier(tier) &&
                        <>
                            <BlueButton href={`/file/${file.id}`}>編集</BlueButton>
                            <DeleteFileButton id={file.id}/>
                        </>
                    }
                </div>
            </div>
            <div className="whitespace-pre-wrap text-sm lg:text-base">{file.category} {file.tags}</div>
        </WhiteFrameUI>
    );
}