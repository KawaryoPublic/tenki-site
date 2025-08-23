import { Suspense } from "react";
import { HeaderNav } from "../ui/HeaderNav";

export default function Header() {
  return (
    <header className="top-4 left-0 w-full pt-4 pl-4">
      <h1 className="text-3xl">天文気象部</h1>
      <Suspense>
        <HeaderNav />
      </Suspense>
    </header>
  );
}