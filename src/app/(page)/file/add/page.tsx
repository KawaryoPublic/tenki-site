import WhiteFrame from "@/components/ui/global/WhiteFrame";
import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";
import AddFileForm from "@/components/ui/file/Form/AddFileForm";
import BlueButton from "@/components/ui/global/Button/BlueButton";

export default async function Home() {
    const tier = await getTier();

    return (
        checkTier(tier) &&
        <section className="w-full flex flex-col gap-4">
            <WhiteFrame className="flex flex-col gap-2">
                <h2 className="text-xl border-b">ファイルを追加</h2>
                <AddFileForm />
            </WhiteFrame>
            <div>
                <BlueButton href="/file">ファイルに戻る</BlueButton>
            </div>
        </section>
    )
}