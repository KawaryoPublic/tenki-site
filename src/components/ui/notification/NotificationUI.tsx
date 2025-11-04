import DeleteNotificationButton from "./Button/DeleteNotificationButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { checkTier } from "@/lib/util";
import { Notification, TIER } from "@/lib/type";
import BlueButton from "../global/Button/BlueButton";
import Link from "next/link";

export default function NotificationUI({ notification, tier }: { notification: Notification, tier: TIER }) {
    const updatedAt = new Date(notification.updatedAt);

    return (
        <WhiteFrameUI>
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
            <div className="whitespace-pre-wrap text-sm lg:text-base">{notification.content}</div>
            <div className={`text-xs lg:text-sm text-blue-700 font-bold ${notification.tags.length !== 0 && "mt-1 lg:mt-2"}`}>
                {
                    notification.tags.map((tag, index) => 
                        <Link key={index} href={`/notification?tags=${tag}`} className="mr-2">#{tag}</Link>
                    )
                }
            </div>
        </WhiteFrameUI>
    );
}