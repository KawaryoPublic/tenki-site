import LoginForm from "@/components/ui/password/Form/LoginForm";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import { getTier } from "@/lib/actions";
import { TIER_LABELS } from "@/lib/const";
import DefaultHeadingUI from "@/components/ui/global/DefaultHeadingUI";
import LogoutButton from "@/components/ui/password/Button/LogoutButton";
import GoBackButton from "@/components/ui/password/Button/GoBackButton";

export default async function Home() {
  const tier = await getTier();

  return (
    <section className="w-full">
      <WhiteFrameUI className="flex flex-col gap-4">
        <DefaultHeadingUI className="border-b pb-2">ログイン</DefaultHeadingUI>
        <span className="text-sm md:text-lg">{tier === 0 ? `あなたは現在ログインしていません。ログインするにはパスワードが必要です。` : `あなたは現在、${TIER_LABELS[tier]}としてログインしています。`}</span>
        {tier === 0 ? <LoginForm /> : <div><LogoutButton /></div>}
      </WhiteFrameUI>
      <div className="pt-4">
        <GoBackButton />
      </div>
    </section>
  );
}