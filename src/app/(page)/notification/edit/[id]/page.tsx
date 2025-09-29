import WhiteFrame from "@/components/ui/WhiteFrame";
import BlueButton from "@/components/ui/Button/BlueButton";
import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";
import EditNotificationForm from "@/components/feature/notification/edit/EditNotificationForm";

export default async function Home({ params }: { params: { id: string }}) {
    const tier = await getTier();

    return (
        checkTier(tier, true, true) &&
        <section className="w-full flex flex-col gap-4">
            <WhiteFrame className="flex flex-col gap-2">
                <h2 className="text-xl border-b">告知を編集</h2>
                <EditNotificationForm />
            </WhiteFrame>
            <div>
                <BlueButton href="/notification">告知に戻る</BlueButton>
            </div>
        </section>
    )
}