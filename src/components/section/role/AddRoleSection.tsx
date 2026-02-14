import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import AddRoleForm from "@/components/ui/role/Form/AddRoleForm";

export default function AddRoleSection() {
    return (
        <section className="w-full flex flex-col gap-8">
            <WhiteFrameUI>
                <AddRoleForm />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/role">役職一覧に戻る</BlueButton>
            </div>
         </section>
    );
}