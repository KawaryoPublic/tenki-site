import AddEquipmentForm from "@/components/ui/equipment/Form/AddEquipmentForm";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";

export default function AddEquipmentSection() {
    return (
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <AddEquipmentForm />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/equipment">機材一覧に戻る</BlueButton>
            </div>
        </section>
    )
}