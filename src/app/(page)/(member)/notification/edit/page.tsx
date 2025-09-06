import NotificationEditSection from "@/components/layout/member/notification/NotificationEditSection";

export default async function Home({ searchParams }: { searchParams: { q: string } }) {
    return (
        <div className="w-full h-full flex flex-col">
            <NotificationEditSection q={(await searchParams).q} />
        </div>
    )
}