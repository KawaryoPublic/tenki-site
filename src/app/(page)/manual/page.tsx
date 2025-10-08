import Link from "next/link";

export default function Home() {
    return (
        <section>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg md:text-xl font-bold">いつもの観測</h2>
                    <nav className="pl-1 flex flex-col gap-1">
                        <Link href="/manual">気象観測</Link>
                        <Link href="/manual">太陽観測</Link>
                    </nav>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg md:text-xl font-bold">機材</h2>
                    <nav className="pl-1 flex flex-col gap-1">
                        
                    </nav>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg md:text-xl font-bold">合宿</h2>
                    <nav className="pl-1 flex flex-col gap-1">
                        
                    </nav>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg md:text-xl font-bold">文化祭</h2>
                    <nav className="pl-1 flex flex-col gap-1">
                
                    </nav>
                </div>
            </div>
        </section>
    )
}
