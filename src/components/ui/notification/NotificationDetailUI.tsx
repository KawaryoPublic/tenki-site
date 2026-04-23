import { splitLinksAndHeaders } from "@/lib/utils";
import WhiteFrameUI from "../global/WhiteFrameUI";
import { Notification, Role } from "@/lib/types";
import DeleteNotificationButton from "./Button/DeleteNotificationButton";
import OptionUrlUI from "../global/OptionUrlUI";
import Link from "next/link";
import DefaultHeadingUI from "../global/DefaultHeadingUI";
import DefaultDetailTitleUI from "../global/DefaultDetailTitleUI";

export default function NotificationDetailUI({ notification, roles, tier }: { notification: Notification, roles: Role[], tier: number }) {
    return (
        <WhiteFrameUI className="flex flex-col gap-2">
            <DefaultDetailTitleUI tier={tier} editLink={`/notification/edit/${notification.id}`} deleteButton={<DeleteNotificationButton id={notification.id} urls={notification.urls} />} updatedAt={new Date(notification.updatedAt)} roles={roles} tags={notification.tags} className="border-b pb-2">
                <DefaultHeadingUI className={`${notification.important ? "text-red-600" : ""}`}>
                    {notification.title}
                </DefaultHeadingUI>
            </DefaultDetailTitleUI>
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