import BlueButton from "@/components/ui/global/button/BlueButton";
import DefaultLink from "@/components/ui/global/DefaultLink";
import NotificationEditForm from "@/components/ui/notification/edit/NotificationEditForm";
import { Suspense } from "react";

export default function NotificationEditSection() {
    return (
        <section>
            <div className="mb-4">
                <NotificationEditForm />
            </div>
            <div className="mt-4">
                <BlueButton>
                    <Suspense>
                        <DefaultLink href="/notification">告知に戻る</DefaultLink>
                    </Suspense>
                </BlueButton>
            </div>
        </section>
    )
}