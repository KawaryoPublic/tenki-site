import { getTier } from "@/lib/actions";
import Nav from "./Nav";
import Link from "next/link";
import Image from "next/image";

export default async function Header() {
  const tier = await getTier();

  return (
    <header className="text-gray-900 pt-4 pl-4 w-full flex items-center bg-gray-300 whitespace-nowrap">
        <h1 className="text-xl md:text-3xl font-bold">天文気象部</h1>
        <nav className="flex text-base md:text-xl gap-2 md:gap-4 p-2 md:p-4 overflow-x-auto">
          <Nav href="/" title="ホーム" tier={tier} allowAll />
          <Nav href="/about" title="アバウト" tier={tier} allowAll />
          <Nav href="/notification" title="告知" tier={tier} allowAll />
          <Nav href="/calendar" title="カレンダー" tier={tier} allowStudent />
          <Nav href="/storage/0" title="倉庫" tier={tier} allowStudent />
          <Nav href="/file" title="ファイル" tier={tier} allowStudent/>
          <Nav href="/manual" title="マニュアル" tier={tier} allowStudent />
        </nav>
        <div className="flex-none ml-auto pr-4">
          <Link href="/password">
            <Image src="/image/sign_in.jpg" alt="部員はこちら" width={980} height={980} className="w-5 h-5 md:w-7 md:h-7" />
          </Link>
        </div>
    </header>
  );
}