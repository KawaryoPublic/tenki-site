import type { Metadata } from "next";
import "@/app/globals.css";
import Image from "next/image";

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
      <body className="w-screen min-h-screen overflow-x-hidden flex flex-col items-center p-5">
        {children}
        <Image src="/image/bg_pc.jpg" alt="背景" fill className="flex fixed opacity-25 object-cover max-sm:hidden z-[-1]" />
        <Image src="/image/bg_phone.jpg" alt="背景" fill className="flex fixed opacity-25 object-cover sm:hidden z-[-1]" />
      </body>
    </html>
  );
}