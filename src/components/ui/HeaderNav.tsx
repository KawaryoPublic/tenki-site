"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import DefaultLink from "./DefaultLink";
import { getPasswords } from "@/action";

export function HeaderNav() {
    const [passwords, setPasswords] = useState<{student: string | null, parent: string | null, executive: string | null}>();
    const password = useSearchParams().get("q");

    useEffect(() => {
        getPasswords(setPasswords);
    },[])

    return (
        <nav>
            <ul className="flex text-xl space-x-4 p-4">
                <li>
                    <DefaultLink href="home">ホーム</DefaultLink>
                </li>
                <li className={password === passwords.parent || password === passwords.executive ? "" : "hidden"}>
                    <DefaultLink href="notification">告知</DefaultLink>
                </li>
                <li>
                    <DefaultLink href="calender">カレンダー</DefaultLink>
                </li>
                <li className={password === passwords.student || password === passwords.executive ? "" : "hidden"}>
                    <DefaultLink href="equipment">機材</DefaultLink>
                </li>
                <li className={password === passwords.student || password === passwords.executive ? "" : "hidden"}>
                    <DefaultLink href="manual">マニュアル</DefaultLink>
                </li>
                <li className={password === passwords.executive ? "" : "hidden"}>
                    <DefaultLink href="file">ファイル</DefaultLink>
                </li>
            </ul>
        </nav>
    );
}