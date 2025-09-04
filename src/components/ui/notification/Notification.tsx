import { Suspense } from "react";
import RestrictedContent from "../global/RestrictedContent";
import DeleteNotificationButton from "./DeleteNotificationButton";

export default function Notification({ id, title, createdAt, content }: { id: number, title: string, createdAt: Date, content: string }) {
    return (
        <div className="border p-4 rounded shadow-md w-full bg-white">
            <div className="flex justify-between items-center mb-2 border-b pb-2">
                <span className="text-3xl font-bold">{title}</span>
                <div className="flex items-center gap-4">
                    <span className="text-gray-800">{`${new Date(createdAt).getFullYear()}年${new Date(createdAt).getMonth() + 1}月${new Date(createdAt).getDate()}日`}</span>
                    <Suspense>
                        <RestrictedContent>
                            <DeleteNotificationButton id={id}/>
                        </RestrictedContent>
                    </Suspense>
                </div>
            </div>
            <p className="whitespace-pre-wrap">{content}</p>
        </div>
    );
}