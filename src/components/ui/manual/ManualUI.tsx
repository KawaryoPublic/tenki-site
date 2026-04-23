import DeleteManualButton from "./Button/DeleteManualButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { Manual, Role } from "@/lib/types";
import DefaultDetailTitleUI from "../global/DefaultDetailTitleUI";
import DefaultHeadingUI from "../global/DefaultHeadingUI";
import Link from "next/link";

export default function ManualUI({ manual, roles, tier }: { manual: Manual, roles: Role[], tier: number }) {
    return (
        <WhiteFrameUI className="flex justify-between items-center">
            <DefaultDetailTitleUI tier={tier} editLink={`/manual/edit/${manual.id}`} deleteButton={<DeleteManualButton id={manual.id} urls={manual.urls} />} updatedAt={new Date(manual.updatedAt)} roles={roles} tags={manual.tags}>
                <DefaultHeadingUI>
                    <Link href={`/manual/${manual.id}`}>{manual.title}</Link>
                </DefaultHeadingUI>
            </DefaultDetailTitleUI>
        </WhiteFrameUI>
    );
}