import { Suspense } from "react";
import RestrictedLink from "../../ui/global/RestrictedLink";
import RestrictedContent from "../../ui/global/RestrictedContent";
import Link from "next/link";

export default async function Header() {
  return (
    <header className="top-4 left-0 w-full">
      <h1 className="text-xl lg:text-3xl">天文気象部</h1>
      <Suspense>
        <nav>
            <ul className="flex text-base lg:text-xl space-x-3 lg:space-x-4 p-2 lg:p-4">
                <li>
                    <Link href="/">ホーム</Link>
                </li>
                <RestrictedContent allowParent allowStudent>
                    <li>
                        <RestrictedLink href="/notification">告知</RestrictedLink>
                    </li>
                </RestrictedContent>
                <RestrictedContent allowStudent>
                    <li>
                        <RestrictedLink href="/calender">カレンダー</RestrictedLink>
                    </li>
                </RestrictedContent>
                <RestrictedContent allowStudent>
                    <li>
                        <RestrictedLink href="/equipment">機材</RestrictedLink>
                    </li>
                </RestrictedContent>
                <RestrictedContent allowStudent>
                    <li>
                        <RestrictedLink href="/manual">マニュアル</RestrictedLink>
                    </li>
                </RestrictedContent>
                <RestrictedContent>
                    <li>
                        <RestrictedLink href="/file">ファイル</RestrictedLink>
                    </li>
                </RestrictedContent>
                
            </ul>
        </nav>
      </Suspense>
    </header>
  );
}