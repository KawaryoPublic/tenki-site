import { getTier } from "@/lib/action";
import Nav from "../../ui/header/Nav";
import BlueButton from "@/components/ui/Button/BlueButton";
import Link from "next/link";

export default async function Header() {
  const tier = await getTier();

  return (
    <header className="text-gray-900 pt-4 pl-4 w-full flex items-center bg-gray-300">
        <h1 className="text-xl lg:text-3xl">天文気象部</h1>
        <nav className="flex text-base lg:text-xl space-x-3 lg:space-x-4 p-2 lg:p-4">
          <Nav href="/home" title="ホーム" tier={tier} allowAll />
          <Nav href="/about" title="アバウト" tier={tier} allowAll />
          <Nav href="/notification" title="告知" tier={tier} allowAll />
          <Nav href="/calendar" title="カレンダー" tier={tier} allowStudent />
          <Nav href="/storage/0" title="倉庫" tier={tier} allowStudent />
          <Nav href="/file" title="ファイル" tier={tier} />
        </nav>
        <div className="ml-auto pr-4">
          <BlueButton>
            <Link href="/password">部員はこちら</Link>
          </BlueButton>
        </div>
    </header>
  );
}