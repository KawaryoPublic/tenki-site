import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import AddNotificationForm from "@/components/ui/notification/Form/AddNotificationForm";

export default function AddNotificationSection() {
    return (
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI className="flex flex-col gap-2">
                <h2 className="text-xl border-b">告知を追加</h2>
                <AddNotificationForm />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/notification">告知に戻る</BlueButton>
            </div>
        </section>
    )
}