import DateInfoSection from "@/components/layout/member/calender/DateInfoSection";

export default async function Home({ params,  }: { params: { id: number }, searchParams: { q: string } }) {
    <div className="w-full flex flex-col">
        <DateInfoSection id={(await params).id} q={"(await searchParams).q"} /> 
    </div>
}