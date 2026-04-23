import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { File, Role } from "@/lib/types";
import DeleteFileButton from "./Button/DeleteFileButton";
import DefaultDetailTitleUI from "../global/DefaultDetailTitleUI";
import DefaultHeadingUI from "../global/DefaultHeadingUI";

export default function FileUI({ file, roles, tier }: { file: File, roles: Role[], tier: number }) {
    return (
        <WhiteFrameUI className="flex justify-between items-center">
            <DefaultDetailTitleUI tier={tier} editLink={`/file/edit/${file.id}`} deleteButton={<DeleteFileButton id={file.id} />} updatedAt={new Date(file.updatedAt)} roles={roles} tags={file.tags}>
                <DefaultHeadingUI>
                    <a href={file.url} target="_blank" rel="noopener noreferrer">{file.title}</a>
                </DefaultHeadingUI>
            </DefaultDetailTitleUI>
        </WhiteFrameUI>
    );
}