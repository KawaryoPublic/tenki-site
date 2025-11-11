import DeleteNotificationButton from "./Button/DeleteNotificationButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { checkTier } from "@/lib/util";
import { Notification, TIER } from "@/lib/type";
import BlueButton from "../global/Button/BlueButton";
import Link from "next/link";

export default function NotificationUI({ notification, tier }: { notification: Notification, tier: TIER }) {
    const updatedAt = new Date(notification.updatedAt);

    return (
        <WhiteFrameUI className="flex flex-col gap-2">
            <div className={`flex justify-between items-center ${notification.tags.length !== 0 && "border-b pb-2"}`}>
                <Link className="text-xl md:text-3xl font-bold" href={`notification/${notification.id}`}>{notification.title}</Link>
                <div className="flex items-center gap-2 md:gap-4">
                    <span className="text-gray-800 text-xs md:text-sm">{`${updatedAt.getFullYear() === (new Date()).getFullYear() ? "" : `${updatedAt.getFullYear()}年`}${updatedAt.getMonth() + 1}月${updatedAt.getDate()}日`}</span>
                    {
                        checkTier(tier) &&
                        <>
                            <BlueButton href={`/notification/edit/${notification.id}`}>編集</BlueButton>
                            <DeleteNotificationButton id={notification.id} urls={notification.urls} />
                        </>
                    }
                </div>
            </div>
            <div className="text-xs md:text-sm text-blue-700 font-bold">
                {
                    notification.tags.map((tag, index) => 
                        <Link key={index} href={`/notification?tags=${tag}`} className="mr-2">#{tag}</Link>
                    )
                }
            </div>
        </WhiteFrameUI>
    );
}