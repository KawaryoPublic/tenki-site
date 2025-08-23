"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export function HeaderNav() {
  const [passwords, setPasswords] = useState({student: null, parent: null, executive: null});
  const password = useSearchParams().get("q");

  useEffect(() => {
        fetch('/api/passwords.json', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            setPasswords(data);
            console.log(data);
        })
    },[])

  return (
    <nav>
        <ul className="flex text-xl space-x-4 p-4">
            <li>
                <Link href={`/home?q=${password}`}>ホーム</Link>
            </li>
            <li className={password === passwords.parent || password === passwords.executive ? "" : "hidden"}>
                <Link href={`/notification?q=${password}`}>告知</Link>
            </li>
            <li className={password === passwords.student || password === passwords.executive ? "" : "hidden"}>
                <Link href={`/equipment?q=${password}`}>機材</Link>
            </li>
            <li className={password === passwords.student || password === passwords.executive ? "" : "hidden"}>
                <Link href={`/manual?q=${password}`}>マニュアル</Link>
            </li>
            <li className={password === passwords.executive ? "" : "hidden"}>
                <Link href={`/file?q=${password}`}>ファイル</Link>
            </li>
        </ul>
      </nav>
  );
}