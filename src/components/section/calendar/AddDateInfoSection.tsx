import AddDateInfoForm from "@/components/ui/calendar/Form/AddDateInfoForm";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { formatDate } from "@/lib/util";

export default function AddDateInfoSection({ date }: { date: string }) {
    return (
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI className="flex flex-col gap-2">
                <h2 className="text-lg lg:text-xl border-b">{formatDate(date)}の詳細を追加</h2>
                <AddDateInfoForm date={date} />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/file">カレンダーに戻る</BlueButton>
            </div>
        </section>
    );
}