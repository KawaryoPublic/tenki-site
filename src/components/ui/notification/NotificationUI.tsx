import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { Notification, Role } from "@/lib/types";
import DeleteNotificationButton from "./Button/DeleteNotificationButton";
import DefaultDetailTitleUI from "../global/DefaultDetailTitleUI";
import DefaultHeadingUI from "../global/DefaultHeadingUI";
import Link from "next/link";

export default function NotificationUI({ notification, roles, tier }: { notification: Notification, roles: Role[], tier: number }) {
    return (
        <WhiteFrameUI className="flex justify-between items-center">
            <DefaultDetailTitleUI tier={tier} editLink={`/notification/edit/${notification.id}`} deleteButton={<DeleteNotificationButton id={notification.id} urls={notification.urls} />} updatedAt={new Date(notification.updatedAt)} roles={roles} tags={notification.tags}>
                <DefaultHeadingUI className={`${notification.important ? "text-red-600" : ""}`}>
                    <Link href={`/notification/${notification.id}`}>{notification.title}</Link>
                </DefaultHeadingUI>
            </DefaultDetailTitleUI>
        </WhiteFrameUI>
    );
}