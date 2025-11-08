import WhiteFrameUI from "../global/WhiteFrameUI";
import { Notification } from "@/lib/type";

export default function NotificationDetailUI({ notification }: { notification: Notification }) {
    return (
        <WhiteFrameUI className="flex flex-col gap-2">
            <div className="border-b">
                <h2 className="text-lg lg:text-xl">{notification.title}</h2>
            </div>
            <div>
                <p>{notification.content}</p>
            </div>
        </WhiteFrameUI>
    )
}