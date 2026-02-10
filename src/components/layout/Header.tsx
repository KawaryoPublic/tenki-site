import { getTier } from "@/lib/actions";
import Nav from "./Nav";
import Image from "next/image";
import Link from "next/link";

export default async function Header() {
  const tier = await getTier();

  return (
    <header className="relative z-2 text-gray-900 pt-4 pl-4 w-full flex items-center bg-gray-300 whitespace-nowrap">
        <h1 className="text-xl md:text-3xl font-bold">天文気象部</h1>
        <nav className="flex text-base md:text-xl gap-2 md:gap-4 p-2 md:p-4 overflow-x-auto">
          <Nav href="/" title="ホーム" tier={tier} allowAll />
          <Nav href="/about" title="アバウト" tier={tier} allowAll />
          <Nav href="/notification" title="告知" tier={tier} allowAll />
          <Nav href="/calendar" title="カレンダー" tier={tier} allowStudent />
          <Nav href="/equipment" title="機材" tier={tier} allowStudent />
          <Nav href="/storage/location/1" title="倉庫" tier={tier} allowStudent />
          <Nav href="/file" title="ファイル" tier={tier} allowStudent/>
          <Nav href="/manual" title="マニュアル" tier={tier} allowStudent />
          <Nav href="/role" title="各役職" tier={tier} allowStudent />
        </nav>
        <Link href="/password" className="right-2 md:right-4 aspect-square absolute h-[50%] bg-blue-500 hover:bg-blue-600 focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 text-whitextext-sm md:text-base rounded">
          <Image src="/image/sign_in.jpg" alt="部員はこちら" fill sizes="w-full h-full"/>
        </Link>
    </header>
  );
}