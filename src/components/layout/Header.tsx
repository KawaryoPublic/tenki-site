import { Suspense } from "react";
import { HeaderNav } from "../ui/HeaderNav";
import { Passwords } from "@/lib/type";
import { fetchJson } from "@/lib/action";

export default async function Header() {
  const passwords: Passwords = await fetchJson("/api/passwords.json");

  return (
    <header className="top-4 left-0 w-full pt-4 pl-4">
      <h1 className="text-3xl">天文気象部</h1>
      <Suspense>
        <HeaderNav passwords={passwords} />
      </Suspense>
    </header>
  );
}