import BlueButton from "../ui/global/Button/BlueButton";

export default function NotFoundSection() {
    return (
        <div className="flex-1 flex flex-col gap-4 items-center font-bold text-lg md:text-xl">
            <span>ページが見つかりませんでした</span>
            <BlueButton href="/">ホームに戻る</BlueButton>
        </div>
    );
}