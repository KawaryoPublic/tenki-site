import { checkTier, splitLinksAndHeaders } from "@/lib/utils";
import BlueButton from "../global/Button/BlueButton";
import WhiteFrameUI from "../global/WhiteFrameUI";
import { Notification } from "@/lib/types";
import DeleteNotificationButton from "./Button/DeleteNotificationButton";
import OptionUrlUI from "../global/OptionUrlUI";
import Link from "next/link";

export default function NotificationDetailUI({ notification, tier }: { notification: Notification, tier: number }) {
    const updatedAt = new Date(notification.updatedAt);

    return (
        <WhiteFrameUI className="flex flex-col gap-2">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl md:text-3xl font-bold">{notification.title}</h2>
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="flex items-center gap-1 md:gap-2 max-sm:hidden">
                        <span className="text-gray-800 text-xs md:text-sm">{`${updatedAt.getFullYear() === (new Date()).getFullYear() ? "" : `${updatedAt.getFullYear()}年`}${updatedAt.getMonth() + 1}月${updatedAt.getDate()}日`}</span>
                        <span className="text-gray-800 text-xs md:text-sm">{`${notification.roleNames.join(",")}`}</span>
                    </div>
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
                {
                    splitLinksAndHeaders(notification.content).map((part, index) => (
                        part.type === "link" ? 
                            <Link key={index} href={part.content} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{part.content}</Link> :
                            part.type === "header" ?
                                <h3 key={index} className="text-lg md:text-xl font-bold mb-1">{part.content}</h3> :
                                <span key={index}>{part.content}</span>
                    ))
                }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-sm md:text-base">
                {
                    notification.urls.map((url, index) => (
                        <OptionUrlUI key={index} url={url} label={notification.filenames[index]} className="py-2" />
                    ))
                }
            </div>
        </WhiteFrameUI>
    )
}