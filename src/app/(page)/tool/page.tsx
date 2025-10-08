import { getTier } from "@/lib/action";
import { checkTier } from "@/lib/util";
import Link from "next/link";

export default async function Home() {
    const tier = await getTier();

    return (
        checkTier(tier, false, true) &&
        <nav className="flex flex-col">
            <Link href="/tool/cloud?height=0">雲の分類</Link>
            <Link href="/tool/sunspot">黒点の分類(未定)</Link>
            <a target="_blank" href="https://www.carina.gr.jp/~yamane/sun_pbl/index.php" rel="noopener noreferrer">太陽の自転軸</a>
        </nav>
    )
}