export default function Home({ params }: { params: { index: string } }) {
    return (
        <div>{params.index}</div>
    )
}