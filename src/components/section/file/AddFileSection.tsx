import AddFileForm from "@/components/ui/file/Form/AddFileForm";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";

export default function AddFileSection() {
    return (
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <AddFileForm />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/file">ファイル一覧に戻る</BlueButton>
            </div>
        </section>
    );
}