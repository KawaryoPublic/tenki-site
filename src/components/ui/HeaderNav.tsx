"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export function HeaderNav() {
  const password = useSearchParams().get("q");

  const studentPassword = "student";
  const parentPassword = "parent";
  const executivePassword = "executive";

  return (
    <nav>
        <ul className="flex text-xl space-x-4 p-4">
            <li>
                <Link href={`/home?q=${password}`}>ホーム</Link>
            </li>
            <li className={password === parentPassword || password === executivePassword ? "" : "hidden"}>
                <Link href={`/notification?q=${password}`}>告知</Link>
            </li>
            <li className={password === studentPassword || password === executivePassword ? "" : "hidden"}>
                <Link href={`/equipment?q=${password}`}>機材</Link>
            </li>
            <li className={password === studentPassword || password === executivePassword ? "" : "hidden"}>
                <Link href={`/manual?q=${password}`}>マニュアル</Link>
            </li>
            <li className={password === executivePassword ? "" : "hidden"}>
                <Link href={`/file?q=${password}`}>ファイル</Link>
            </li>
        </ul>
      </nav>
  );
}