import { checkTier } from "@/lib/util";
import BlueButton from "../global/Button/BlueButton";
import WhiteFrameUI from "../global/WhiteFrameUI";
import { Notification, TIER } from "@/lib/type";

export default function NotificationDetailUI({ notification, tier }: { notification: Notification, tier: TIER }) {
    return (
        <WhiteFrameUI className="flex flex-col gap-2">
            <div className="border-b">
                <h2 className="text-lg lg:text-xl">{notification.title}</h2>
                <div>
                    {
                        checkTier(tier) && <BlueButton href={`/notification/edit/${notification.id}`}>編集</BlueButton>
                    }
                </div>
            </div>
            <div>
                <p>{notification.content}</p>
            </div>
        </WhiteFrameUI>
    )
}