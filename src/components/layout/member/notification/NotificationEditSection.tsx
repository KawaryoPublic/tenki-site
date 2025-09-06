import BlueButton from "@/components/ui/global/button/BlueButton";
import RestrictedLink from "@/components/ui/global/RestrictedLink";
import NotificationEditForm from "@/components/ui/member/notification/edit/NotificationEditForm";

export default function NotificationEditSection({ q }: { q: string }) {
    return (
        <section className="flex flex-col gap-16">
            <div>
                <NotificationEditForm q={q} />
            </div>
            <div>
                <BlueButton>
                    <RestrictedLink href="/notification">告知に戻る</RestrictedLink>
                </BlueButton>
            </div>
        </section>
    )
}
