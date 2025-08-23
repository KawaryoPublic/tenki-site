"use client";

import { useSearchParams } from "next/navigation";

export function HeaderNav() {
  const password = useSearchParams().get("q");

  const studentPassword = "student";
  const parentPassword = "parent";
  const executivePassword = "executive";

  return (
    <nav>
        <ul className="flex text-xl space-x-4 p-4">
            <li>
                <a href={`/home?q=${password}`}>ホーム</a>
            </li>
            <li className={password === parentPassword || password === executivePassword ? "" : "hidden"}>
                <a href={`/notification?q=${password}`}>告知</a>
            </li>
            <li className={password === studentPassword || password === executivePassword ? "" : "hidden"}>
                <a href={`/equipment?q=${password}`}>機材</a>
            </li>
            <li className={password === studentPassword || password === executivePassword ? "" : "hidden"}>
                <a href={`/manual?q=${password}`}>マニュアル</a>
            </li>
            <li className={password === executivePassword ? "" : "hidden"}>
                <a href={`/file?q=${password}`}>ファイル</a>
            </li>
        </ul>
      </nav>
  );
}