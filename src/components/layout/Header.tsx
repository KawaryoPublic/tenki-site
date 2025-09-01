import { Suspense } from "react";
import DefaultLink from "../ui/global/DefaultLink";
import RestrictedContent from "../ui/global/RestrictedContent";

export default async function Header() {
  return (
    <header className="top-4 left-0 w-full">
      <h1 className="text-3xl">天文気象部</h1>
      <Suspense>
        <nav>
            <ul className="flex text-xl space-x-4 p-4">
                <li>
                    <DefaultLink href="/home">ホーム</DefaultLink>
                </li>
                <RestrictedContent allowParent>
                    <li>
                        <DefaultLink href="/notification">告知</DefaultLink>
                    </li>
                </RestrictedContent>
                <RestrictedContent allowStudent>
                    <li>
                        <DefaultLink href="/calender">カレンダー</DefaultLink>
                    </li>
                </RestrictedContent>
                <RestrictedContent allowStudent>
                    <li>
                        <DefaultLink href="/equipment">機材</DefaultLink>
                    </li>
                </RestrictedContent>
                <RestrictedContent allowStudent>
                    <li>
                        <DefaultLink href="/manual">マニュアル</DefaultLink>
                    </li>
                </RestrictedContent>
                <RestrictedContent>
                    <li>
                        <DefaultLink href="/file">ファイル</DefaultLink>
                    </li>
                </RestrictedContent>
                
            </ul>
        </nav>
      </Suspense>
    </header>
  );
}