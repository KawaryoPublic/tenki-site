import Header from "@/components/layout/member/Header";
import RestrictedContent from "@/components/ui/global/RestrictedContent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RestrictedContent allowParent allowStudent>
      <Header />
      <main className="pb-2 container flex-1 flex">
        {children}
      </main>
    </RestrictedContent>
  );
}