import AddFileForm from "@/components/ui/file/Form/AddFileForm";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";

export default function AddFileSection() {
    return (
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI className="flex flex-col gap-2">
                <h2 className="text-xl border-b">ファイル情報を追加</h2>
                <AddFileForm />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/file">ファイルに戻る</BlueButton>
            </div>
        </section>
    );
}