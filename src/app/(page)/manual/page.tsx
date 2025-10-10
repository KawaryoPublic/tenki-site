import BlueButton from "@/components/ui/Button/BlueButton";
import WhiteFrame from "@/components/ui/WhiteFrame";
import Link from "next/link";

export default function Home() {
    return (
        <section className="flex flex-col gap-3 w-full">
            <div>
                <BlueButton href="/manual/edit">追加</BlueButton>
            </div>
            <div className="flex flex-col gap-4">
                <WhiteFrame>
                    <div className="flex justify-between items-center mb-2 border-b pb-2">
                        <h2 className="text-xl md:text-2xl font-bold">いつもの観測</h2>
                        <BlueButton href="/manual/edit" className="mr-auto">追加</BlueButton>
                    </div>
                    <nav className="underline flex flex-col gap-1">
                        <Link href="/manual">気象観測</Link>
                        <Link href="/manual">太陽観測</Link>
                    </nav>
                </WhiteFrame>
            </div>
        </section>
    )
}
