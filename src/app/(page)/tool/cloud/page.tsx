import { getTier } from "@/lib/action";

export default async function Home({ searchParams }: { searchParams: { height: string }}) {
    const tier = await getTier();

    return (
        <div>
            <h1>{["CL", "CM", "CH"][Number(searchParams.height)]}の分類</h1>
            <div>
                <p>Cb(積乱雲)はありますか?</p>
                <button className="pr-4">ある</button><button>ない</button>
            </div>
            ....
            <div>{["CL", "CM", "CH"][Number(searchParams.height)]}は4です。</div>
        </div>
    )
}