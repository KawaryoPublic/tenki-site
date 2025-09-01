import DateInfoSection from "@/components/layout/DateInfoSection";

export default function Home({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);

    return (
        <div>
            <DateInfoSection id={id} />
        </div>
    )
}