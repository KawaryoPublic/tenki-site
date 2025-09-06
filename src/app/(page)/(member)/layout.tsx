import Header from "@/components/layout/member/Header";
import RestrictedContent from "@/components/ui/global/RestrictedContent";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <RestrictedContent allowParent allowStudent>
        <Header />
        <main className="pb-2 container flex-1 flex">
          {children}
        </main>
      </RestrictedContent>
    </Suspense>
  );
}