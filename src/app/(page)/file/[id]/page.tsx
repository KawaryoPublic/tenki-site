import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import EditFileForm from "@/components/ui/file/Form/EditFileForm";

export default async function Home(props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const tier = await getTier();

    return (
        checkTier(tier, true, true) &&
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI className="flex flex-col gap-2">
                <h2 className="text-xl border-b">ファイル情報を編集</h2>
                <EditFileForm id={Number(params.id)} />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/notification">告知に戻る</BlueButton>
            </div>
        </section>
    )
}