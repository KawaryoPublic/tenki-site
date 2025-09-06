import CalenderSection from "@/components/layout/member/calender/CalenderSection";

export default function Home() {
    return (
        <div className="flex flex-col space-x-4 lg:flex-row lg:space-y-4 w-full">
            {
                Array.from({ length: 3 }).map((_, i) => (
                    <CalenderSection key={i} index={i} />
                ))
            }
        </div>
    )
}