import { Suspense } from "react";
import RestrictedContent from "@/components/ui/global/RestrictedContent";
import DeleteNotificationButton from "./DeleteNotificationButton";
import WhiteFrame from "../../global/WhiteFrame";

export default function Notification({ id, title, createdAt, content }: { id: number, title: string, createdAt: Date, content: string }) {
    return (
        <WhiteFrame>
            <div className="flex justify-between items-center mb-2 border-b pb-2">
                <span className="text-xl lg:text-3xl font-bold">{title}</span>
                <div className="flex items-center gap-4">
                    <span className="text-gray-800 text-xs lg:text-sm">{`${new Date(createdAt).getFullYear()}年${new Date(createdAt).getMonth() + 1}月${new Date(createdAt).getDate()}日`}</span>
                    <Suspense>
                        <RestrictedContent>
                            <DeleteNotificationButton id={id}/>
                        </RestrictedContent>
                    </Suspense>
                </div>
            </div>
            <p className="whitespace-pre-wrap text-sm lg:text-base">{content}</p>
        </WhiteFrame>
    );
}