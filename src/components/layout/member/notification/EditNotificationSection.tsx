import BlueButton from "@/components/ui/global/button/BlueButton";
import RestrictedLink from "@/components/ui/global/RestrictedLink";
import WhiteFrame from "@/components/ui/global/WhiteFrame";
import NotificationEditForm from "@/components/ui/member/notification/edit/EditNotificationForm";

export default function EditNotificationSection({ q }: { q: string }) {
    return (
        <section className="flex flex-col gap-4">
            <WhiteFrame className="flex flex-col gap-2">
                <h2 className="text-xl border-b">告知を追加</h2>
                <NotificationEditForm q={q} />
            </WhiteFrame>
            <div>
                <BlueButton>
                    <RestrictedLink href="/notification">告知に戻る</RestrictedLink>
                </BlueButton>
            </div>
        </section>
    )
}
