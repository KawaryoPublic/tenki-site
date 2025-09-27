import DeleteNotificationButton from "./DeleteNotificationButton";
import WhiteFrame from "@/components/ui/WhiteFrame";
import { checkTier } from "@/lib/util";
import { NotificationType, TIER } from "@/lib/type";
import BlueButton from "@/components/ui/Button/BlueButton";
import Link from "next/link";

export default function Notification({ notification, tier }: { notification: NotificationType, tier: TIER }) {
    return (
        <WhiteFrame>
            <div className="flex justify-between items-center mb-2 border-b pb-2">
                <span className="text-xl lg:text-3xl font-bold">{notification.title}</span>
                <div className="flex items-center gap-4">
                    <span className="text-gray-800 text-xs lg:text-sm">{`${new Date(notification.updatedAt).getFullYear()}年${new Date(notification.updatedAt).getMonth() + 1}月${new Date(notification.updatedAt).getDate()}日`}</span>
                    {
                        checkTier(tier) ? 
                        <>
                            <DeleteNotificationButton id={notification.id}/>
                            <BlueButton>
                                <Link href={`/notification/edit/${notification.id}`} className="w-full h-full">編集</Link>
                            </BlueButton>
                        </> : ""
                    }
                </div>
            </div>
            <p className="whitespace-pre-wrap text-sm lg:text-base">{notification.content}</p>
        </WhiteFrame>
    );
}