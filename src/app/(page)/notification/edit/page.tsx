import WhiteFrame from "@/components/ui/WhiteFrame";
import BlueButton from "@/components/ui/Button/BlueButton";
import AddNotificationForm from "@/components/feature/notification/edit/AddNotificationForm";
import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";

export default async function Home() {
    const tier = await getTier();

    return (
        checkTier(tier, true, true) &&
        <section className="w-full flex flex-col gap-4">
            <WhiteFrame className="flex flex-col gap-2">
                <h2 className="text-xl border-b">告知を追加</h2>
                <AddNotificationForm />
            </WhiteFrame>
            <div>
                <BlueButton href="/notification">告知に戻る</BlueButton>
            </div>
        </section>
    )
}