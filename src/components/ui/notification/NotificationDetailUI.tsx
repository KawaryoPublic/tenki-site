import { checkTier, splitLinksAndHeaders } from "@/lib/utils";
import WhiteFrameUI from "../global/WhiteFrameUI";
import { Notification, Role } from "@/lib/types";
import DeleteNotificationButton from "./Button/DeleteNotificationButton";
import Image from "next/image";
import { useState } from "react";
import OptionUrlUI from "../global/OptionUrlUI";
import Link from "next/link";

export default function NotificationDetailUI({ notification, roles, tier }: { notification: Notification, roles: Role[], tier: number }) {
    const [ showOptions, setShowOptions ] = useState(false);
    const updatedAt = new Date(notification.updatedAt);

    return (
        <WhiteFrameUI className="flex flex-col gap-2">
            <button className={`fixed top-0 right-0 w-full h-full z-1 ${showOptions ? "" : "hidden"}`} onClick={() => setShowOptions(false)} />
            <div className="flex justify-between items-center border-b pb-2">
                <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{notification.title}</h2>
                        {
                            checkTier(tier) && 
                                <button 
                                    className="relative w-4 md-[18px] lg:w-5 aspect-square"
                                    onClick={() => setShowOptions(true)}
                                >
                                    <WhiteFrameUI className={`whitespace-nowrap absolute right-0 top-full mt-1 flex flex-col gap-2 md:gap-4 text-sm md:text-base text-gray-800 z-3 ${showOptions ? "" : "hidden"}`}>
                                        <Link href={`/notification/edit/${notification.id}`} className="hover:underline">編集</Link>
                                        <DeleteNotificationButton id={notification.id} urls={notification.urls} />
                                    </WhiteFrameUI>
                                    <Image src="/image/3_points.webp" alt="Options" fill priority className="w-full h-full cursor-pointer" />
                                </button>
                        }
                    </div>
                    <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                        <span className="text-gray-800 text-xs md:text-sm">{`${updatedAt.getFullYear() === (new Date()).getFullYear() ? "" : `${updatedAt.getFullYear()}年`}${updatedAt.getMonth() + 1}月${updatedAt.getDate()}日更新`}</span>
                        {
                            notification.roles.length > 0 &&
                            <div className="text-gray-800 text-xs md:text-sm flex gap-1 md:gap-2 flex-wrap">
                                {
                                    notification.roles.map((id, index) => 
                                        <Link key={index} href={`/notification?role=${id}`} className="z-2">{`${roles.find(r => r.id === id)?.name}`}</Link>
                                    )
                                }
                            </div>
                        }
                        {
                            notification.tags.length > 0 &&
                            <div className="text-xs md:text-sm font-bold flex gap-1 md:gap-2 flex-wrap">
                                {
                                    notification.tags.map((tag, index) => 
                                        <Link key={index} href={`/notification?tags=${tag}`} className="text-blue-700 z-2">#{tag}</Link>
                                    )
                                }
                            </div>
                        }
                    </div>
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