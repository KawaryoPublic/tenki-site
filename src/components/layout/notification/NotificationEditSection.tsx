import BlueButton from "@/components/ui/global/button/BlueButton";
import DefaultLink from "@/components/ui/global/DefaultLink";
import NotificationEditForm from "@/components/ui/notification/edit/NotificationEditForm";
import { Suspense } from "react";

export default function NotificationEditSection() {
    return (
        <section className="flex flex-col gap-16">
            <div>
                <NotificationEditForm />
            </div>
            <div>
                <BlueButton>
                    <Suspense>
                        <DefaultLink href="/notification">告知に戻る</DefaultLink>
                    </Suspense>
                </BlueButton>
            </div>
        </section>
    )
}
