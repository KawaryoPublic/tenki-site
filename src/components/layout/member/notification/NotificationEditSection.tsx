import BlueButton from "@/components/ui/global/button/BlueButton";
import RestrictedLink from "@/components/ui/global/RestrictedLink";
import NotificationEditForm from "@/components/ui/member/notification/edit/NotificationEditForm";
import { Suspense } from "react";

export default function NotificationEditSection({ q }: { q: string }) {
    return (
        <section className="flex flex-col gap-16">
            <div>
                <NotificationEditForm q={q} />
            </div>
            <div>
                <BlueButton>
                    <Suspense>
                        <RestrictedLink href="/notification">告知に戻る</RestrictedLink>
                    </Suspense>
                </BlueButton>
            </div>
        </section>
    )
}
