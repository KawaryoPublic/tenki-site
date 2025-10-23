import WhiteFrame from "@/components/ui/WhiteFrame";
import { checkTier } from "@/lib/util";
import { FileType, TIER } from "@/lib/type";
import BlueButton from "@/components/ui/Button/BlueButton";
import Link from "next/link";
import DeleteFileButton from "./DeleteFileButton";

export default function File({ file, tier }: { file: FileType, tier: TIER }) {
    const updatedAt = new Date(file.updatedAt);

    return (
        <WhiteFrame>
            <div className="flex justify-between items-center mb-2 border-b pb-2">
                <Link className="text-xl lg:text-3xl font-bold" href={file.url}>{file.title}</Link>
                <div className="flex items-center gap-4">
                    <span className="text-gray-800 text-xs lg:text-sm">{`${updatedAt.getFullYear() === (new Date()).getFullYear() ? "" : `${updatedAt.getFullYear()}年`}${updatedAt.getMonth() + 1}月${updatedAt.getDate()}日`}</span>
                    {
                        checkTier(tier) ? 
                        <>
                            <BlueButton href={`/file/edit/${file.id}`}>編集</BlueButton>
                            <DeleteFileButton id={file.id}/>
                        </> : ""
                    }
                </div>
            </div>
            <div className="whitespace-pre-wrap text-sm lg:text-base">{file.category} {file.tags}</div>
        </WhiteFrame>
    );
}