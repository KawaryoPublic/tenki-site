import AddDateInfoForm from "@/components/ui/calendar/Form/AddDateInfoForm";
import BlueButton from "@/components/ui/global/Button/BlueButton";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { formatDate } from "@/lib/util";

export default function AddDateInfoSection({ date }: { date: string }) {
    return (
        <section className="w-full flex flex-col gap-4">
            <WhiteFrameUI>
                <AddDateInfoForm date={date} />
            </WhiteFrameUI>
            <div>
                <BlueButton href="/calendar">カレンダーに戻る</BlueButton>
            </div>
        </section>
    );
}