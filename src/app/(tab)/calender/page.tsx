import CalenderSection from "@/components/layout/CalenderSection";

export default function Home() {
    return (
        <div className="flex flex-col space-x-4 lg:flex-row lg:space-y-4 w-full">
            {
                Array.from({ length: 3 }, (_, i) => i).map(i => (
                    <CalenderSection key={i} index={i} />
                ))
            }
        </div>
    )    
}