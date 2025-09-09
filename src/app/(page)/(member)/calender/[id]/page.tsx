import DateInfoSection from "@/components/layout/member/calender/DateInfoSection";

export default async function Home({ params, searchParams }: { params: { id: number }, searchParams: { q: string } }) {
    return (
        <div className="w-full flex flex-col">
            <Suspense>
                <RestrictedContent allowStudent>
                    <DateInfoSection id={(await params).id} q={(await searchParams).q} />
                </RestrictedContent>
            </Suspense>
        </div>
    );
}