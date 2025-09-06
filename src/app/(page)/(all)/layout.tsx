import Header from "@/components/layout/all/Header";

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