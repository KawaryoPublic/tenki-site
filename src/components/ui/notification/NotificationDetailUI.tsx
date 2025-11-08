import { checkTier } from "@/lib/util";
import BlueButton from "../global/Button/BlueButton";
import WhiteFrameUI from "../global/WhiteFrameUI";
import { Notification, TIER } from "@/lib/type";
import DeleteNotificationButton from "./Button/DeleteNotificationButton";

export default function NotificationDetailUI({ notification, tier }: { notification: Notification, tier: TIER }) {
    return (
        <WhiteFrameUI className="flex flex-col gap-2">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl lg:text-3xl font-bold">{notification.title}</h2>
                <div className="flex items-center gap-4">
                    {
                        checkTier(tier) && 
                        <>
                            <BlueButton href={`/notification/edit/${notification.id}`}>編集</BlueButton>
                            <DeleteNotificationButton id={notification.id} />
                        </>
                    }
                </div>
            </div>
            <div>
                <p>{notification.content}</p>
            </div>
        </WhiteFrameUI>
    )
}