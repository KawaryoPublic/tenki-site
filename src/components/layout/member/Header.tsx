import RestrictedLink from "../../ui/global/RestrictedLink";
import RestrictedContent from "../../ui/global/RestrictedContent";
import Link from "next/link";
import { Suspense } from "react";

export default async function Header() {
  return (
    <header className="top-4 left-0 w-full">
        <h1 className="text-xl lg:text-3xl">天文気象部</h1>
        <nav>
            <ul className="flex text-base lg:text-xl space-x-3 lg:space-x-4 p-2 lg:p-4">
                <Suspense>
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
                            <RestrictedLink href="/calendar">カレンダー</RestrictedLink>
                        </li>
                    </RestrictedContent>
                    <RestrictedContent allowStudent>
                        <li>
                            <RestrictedLink href="/storage" otherParams="floor=1">倉庫</RestrictedLink>
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
                </Suspense>
            </ul>
        </nav>
    </header>
  );
}