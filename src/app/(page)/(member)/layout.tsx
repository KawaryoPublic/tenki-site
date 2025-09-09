import Header from "@/components/layout/member/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="pb-2 container flex-1 flex">
        {children}
      </main>
    </>
  );
}