import BlueButton from "@/components/ui/Button/BlueButton";
import WhiteFrame from "@/components/ui/WhiteFrame";
import Link from "next/link";

export default function Home() {
    return (
        <section className="w-full">
            <BlueButton href="/manual/edit" className="mb-3">追加</BlueButton>
            <div className="w-full flex flex-col gap-4">
                <WhiteFrame className="flex flex-col gap-2">
                    <div className="flex items-center">
                        <h2 className="text-xl md:text-2xl font-bold">いつもの観測</h2>
                        <BlueButton href="/manual/edit" className="mr-auto">追加</BlueButton>
                    </div>
                    <nav className="pl-1 flex flex-col gap-1">
                        <Link href="/manual">気象観測</Link>
                        <Link href="/manual">太陽観測</Link>
                    </nav>
                </WhiteFrame>
            </div>
        </section>
    )
}
