import BlueButton from "@/components/ui/global/button/BlueButton";
import Link from "next/link";
import { Suspense } from "react";

export default async function Header() {
  return (
    <header className="top-4 left-0 w-full">
      <div className="absolute right-4">
        <BlueButton>
          <Link href="/password">部員用のページはこちら</Link>
        </BlueButton>
      </div>
      <h1 className="text-xl lg:text-3xl">天文気象部</h1>
      <Suspense>
        <nav>
            <ul className="flex text-base lg:text-xl space-x-3 lg:space-x-4 p-2 lg:p-4">
                <li>
                    <Link href="/">ホーム</Link>
                </li>
                <li>
                    <Link href="/about">アバウト</Link>
                </li>
            </ul>
        </nav>
      </Suspense>
    </header>
  );
}