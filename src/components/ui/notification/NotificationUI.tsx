import DeleteNotificationButton from "./Button/DeleteNotificationButton";
import WhiteFrame from "@/components/ui/global/WhiteFrame";
import { checkTier } from "@/lib/util";
import { NotificationType, TIER } from "@/lib/type";
import BlueButton from "../global/Button/BlueButton";

export default function Notification({ notification, tier }: { notification: NotificationType, tier: TIER }) {
    const updatedAt = new Date(notification.updatedAt);

    return (
        <WhiteFrame>
            <div className="flex justify-between items-center mb-2 border-b pb-2">
                <span className="text-xl lg:text-3xl font-bold">{notification.title}</span>
                <div className="flex items-center gap-4">
                    <span className="text-gray-800 text-xs lg:text-sm">{`${updatedAt.getFullYear() === (new Date()).getFullYear() ? "" : `${updatedAt.getFullYear()}年`}${updatedAt.getMonth() + 1}月${updatedAt.getDate()}日`}</span>
                    {
                        checkTier(tier) &&
                        <>
                            <BlueButton href={`/notification/${notification.id}`}>編集</BlueButton>
                            <DeleteNotificationButton id={notification.id}/>
                        </>
                    }
                </div>
            </div>
            <p className="whitespace-pre-wrap text-sm lg:text-base">{notification.content}</p>
        </WhiteFrame>
    );
}