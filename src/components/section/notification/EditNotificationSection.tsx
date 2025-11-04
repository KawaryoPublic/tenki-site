import { useEffect, useState } from "react";
import { Notification } from "@/lib/type";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import EditNotificationForm from "@/components/ui/notification/Form/EditNotificationForm";

export default function EditNotificationSection({ id }: { id: number }) {
    const [ notification, setNotification ] = useState<Notification | null>();
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        fetch(`/api/notification?id=${id}`)
            .then(res => res.json())
            .then(data => setNotification(data))
            .finally(() => setLoading(false))
            .catch(err => console.error(err))
    }, []);

    return (
        loading ? <div className="text-xl flex-1 flex flex-col justify-center items-center">Loading...</div> :
        !notification ? <div className="text-xl flex-1 flex flex-col justify-center items-center">通知を読み込めませんでした</div> :
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI className="flex flex-col gap-2">
                <h2 className="text-xl border-b">告知を編集</h2>
                <EditNotificationForm notification={notification} />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/notification">告知に戻る</BlueButton>
            </div>
        </section>
    )
}