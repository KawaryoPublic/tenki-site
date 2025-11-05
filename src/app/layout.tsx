import type { Metadata } from "next";
import "@/app/globals.css";
import Image from "next/image";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "天気サイト",
  description: "天気サイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen overflow-x-hidden flex flex-col items-center">
        <div className="fixed z-[-1] top-0 left-0 w-full h-screen">
          <Image src="/image/bg_pc.jpg" alt="背景" fill className="object-cover max-sm:hidden" />
          <Image src="/image/bg_phone.jpg" alt="背景" fill className="object-cover sm:hidden" />
          <div className="w-full h-full fixed bg-black opacity-50" />
        </div>
        <Header />
        <main className="p-5 container flex-1 flex">
          {children}
        </main>
      </body>
    </html>
  );
}
