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
            <div className={`flex justify-between items-center ${file.tags.length !== 0 && "border-b pb-2 mb-2"}`}>
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
            <div className="text-xs lg:text-sm text-blue-700 font-bold">
                {
                    file.tags.map((tag, index) => 
                        <span key={index} className="mr-2">#{tag}</span>
                    )
                }
            </div>
        </WhiteFrameUI>
    );
}