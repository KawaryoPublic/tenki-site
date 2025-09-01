import BlueButton from "@/components/ui/global/button/BlueButton";
import DefaultLink from "@/components/ui/global/DefaultLink";
import NotificationEditForm from "@/components/ui/notification/edit/NotificationEditForm";

export default function NotificationEditSection() {
    return (
        <section>
            <div className="mb-4">
                <NotificationEditForm />
            </div>
            <div className="mt-4">
                <BlueButton>
                    <DefaultLink href="/notification">告知に戻る</DefaultLink>
                </BlueButton>
            </div>
        </section>
    )
}