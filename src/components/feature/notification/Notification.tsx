import DeleteNotificationButton from "./DeleteNotificationButton";
import WhiteFrame from "../../all/WhiteFrame";
import { checkTier } from "@/lib/util";
import { NotificationType, TIER } from "@/lib/type";

export default function Notification({ notification, tier }: { notification: NotificationType, tier: TIER }) {
    return (
        <WhiteFrame>
            <div className="flex justify-between items-center mb-2 border-b pb-2">
                <span className="text-xl lg:text-3xl font-bold">{notification.id}</span>
                <div className="flex items-center gap-4">
                    <span className="text-gray-800 text-xs lg:text-sm">{`${new Date(notification.createdAt).getFullYear()}年${new Date(notification.createdAt).getMonth() + 1}月${new Date(notification.createdAt).getDate()}日`}</span>
                    {
                        checkTier(tier) ? <DeleteNotificationButton id={notification.id}/> : ""
                    }
                </div>
            </div>
            <p className="whitespace-pre-wrap text-sm lg:text-base">{notification.content}</p>
        </WhiteFrame>
    );
}