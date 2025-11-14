import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import AddManualForm from "@/components/ui/manual/Form/AddManualForm";

export default function AddManualSection() {
    return (
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <AddManualForm />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/manual">マニュアル一覧に戻る</BlueButton>
            </div>
        </section>
    )
}