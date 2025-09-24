import WhiteFrame from "@/components/ui/WhiteFrame";
import BlueButton from "@/components/ui/Button/BlueButton";
import NotificationEditForm from "@/components/feature/notification/edit/EditNotificationForm";
import { getTier } from "@/lib/action";
import Link from "next/link";
import { checkTier } from "@/lib/util";

export default async function Home() {
    const tier = await getTier();

    return (
        checkTier(tier) &&
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