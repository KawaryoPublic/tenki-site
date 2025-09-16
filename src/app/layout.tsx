import type { Metadata } from "next";
import "@/app/globals.css";
import Image from "next/image";
import Header from "@/components/layout/header/Header";

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
        <Image src="/image/bg_pc.jpg" alt="背景" width={1000} height={1000} priority className="w-full h-full fixed object-cover max-sm:hidden z-[-1]" />
        <Image src="/image/bg_phone.jpg" alt="背景" width={1000} height={1000} priority className="w-full h-full fixed object-cover sm:hidden z-[-1]" />
        <Header />
        <main className="p-5 container flex-1 flex">
          {children}
        </main>
      </body>
    </html>
  );
}