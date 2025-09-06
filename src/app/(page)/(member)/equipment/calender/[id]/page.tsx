import DateInfoSection from "@/components/layout/calender/DateInfoSection";

export default function Home({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);

    return (
        <div className="w-full flex flex-col">
            <DateInfoSection id={id} />
        </div>
    )
}