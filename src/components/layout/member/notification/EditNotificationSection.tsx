import BlueButton from "@/components/ui/global/button/BlueButton";
import WhiteFrame from "@/components/ui/global/WhiteFrame";
import NotificationEditForm from "@/components/ui/member/notification/edit/EditNotificationForm";
import Link from "next/link";

export default function EditNotificationSection() {
    return (
        <section className="flex flex-col gap-4">
            <WhiteFrame className="flex flex-col gap-2">
                <h2 className="text-xl border-b">告知を追加</h2>
                <NotificationEditForm />
            </WhiteFrame>
            <div>
                <BlueButton>
                    <Link href="/notification">告知に戻る</Link>
                </BlueButton>
            </div>
        </section>
    )
}
