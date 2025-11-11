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
                <h2 className="text-xl md:text-3xl font-bold">{notification.title}</h2>
                <div className="flex items-center gap-2 md:gap-4">
                    {
                        checkTier(tier) && 
                        <>
                            <BlueButton href={`/notification/edit/${notification.id}`}>編集</BlueButton>
                            <DeleteNotificationButton id={notification.id}  urls={notification.urls} />
                        </>
                    }
                </div>
            </div>
            <div className="whitespace-pre-wrap text-sm md:text-base">
                <p>{notification.content}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-sm md:text-base">
                {
                    notification.urls.map((url, index) => (
                        <Link key={index} href={url} target="_blank" className="border rounded-md px-2 py-2 md:py-4 overflow-hidden whitespace-nowrap">{notification.filenames[index]}</Link>
                    ))
                }
            </div>
        </WhiteFrameUI>
    )
}