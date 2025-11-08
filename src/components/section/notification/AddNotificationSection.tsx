import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import AddNotificationForm from "@/components/ui/notification/Form/AddNotificationForm";

export default function AddNotificationSection() {
    return (
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <AddNotificationForm />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/notification">告知に戻る</BlueButton>
            </div>
        </section>
    )
}