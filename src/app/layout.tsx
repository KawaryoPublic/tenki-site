import type { Metadata } from "next";
import "./globals.css";

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
      <body className="w-screen min-h-screen overflow-x-hidden flex flex-col items-center">
        {children}
      </body>
    </html>
  );
}
