import { checkTier } from "@/lib/util";
import BlueButton from "../global/Button/BlueButton";
import WhiteFrameUI from "../global/WhiteFrameUI";
import { Notification, TIER } from "@/lib/type";
import DeleteNotificationButton from "./Button/DeleteNotificationButton";
import Link from "next/link";

export default function NotificationDetailUI({ notification, tier }: { notification: Notification, tier: TIER }) {
    return (
        <WhiteFrameUI className="flex flex-col gap-2">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl lg:text-3xl font-bold">{notification.title}</h2>
                <div className="flex items-center gap-2 lg:gap-4">
                    {
                        checkTier(tier) && 
                        <>
                            <BlueButton href={`/notification/edit/${notification.id}`}>編集</BlueButton>
                            <DeleteNotificationButton id={notification.id}  urls={notification.urls} />
                        </>
                    }
                </div>
            </div>
            <div>
                <p>{notification.content}</p>
            </div>
            <div>
                {
                    notification.urls.map((url, index) => (
                        <Link key={index} href={url} target="_blank" className="text-blue-500 underline block">{url}</Link>
                    ))
                }
            </div>
        </WhiteFrameUI>
    )
}